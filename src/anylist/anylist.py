"""Main AnyList client class."""

import asyncio
import base64
import json
import os
import uuid as uuid_module
from pathlib import Path
from typing import Any, Dict, Optional, Union
from typing import List as ListType

import httpx
import websockets
from cryptography.fernet import Fernet
from cryptography.hazmat.primitives import hashes
from cryptography.hazmat.primitives.kdf.pbkdf2 import PBKDF2HMAC

from .item import Item
from .list import List
from .meal_planning_calendar_event import MealPlanningCalendarEvent
from .recipe import Recipe
from .recipe_collection import RecipeCollection

CREDENTIALS_KEY_CLIENT_ID = "clientId"
CREDENTIALS_KEY_ACCESS_TOKEN = "accessToken"
CREDENTIALS_KEY_REFRESH_TOKEN = "refreshToken"


class AnyList:
    """
    AnyList class. There should be one instance per account.

    Args:
        email: AnyList account email
        password: AnyList account password
        credentials_file: Path to credentials storage file (optional)

    Attributes:
        lists: List of shopping lists
        recent_items: Dict mapping list IDs to recent items
        favorite_items: List of favorite items
        recipes: List of recipes
    """

    def __init__(
        self,
        email: str,
        password: str,
        credentials_file: Optional[Union[str, Path]] = None,
    ):
        self.email = email
        self.password = password

        if credentials_file is None:
            credentials_file = Path.home() / ".anylist_credentials"
        self.credentials_file = Path(credentials_file) if credentials_file else None

        # HTTP client configuration
        self.auth_client = httpx.AsyncClient(
            base_url="https://www.anylist.com",
            headers={"X-AnyLeaf-API-Version": "3"},
            follow_redirects=False,
        )

        self.client = httpx.AsyncClient(
            base_url="https://www.anylist.com",
            headers={"X-AnyLeaf-API-Version": "3"},
            follow_redirects=False,
        )

        # Initialize attributes
        self.client_id: Optional[str] = None
        self.access_token: Optional[str] = None
        self.refresh_token: Optional[str] = None

        self.lists: ListType[List] = []
        self.favorite_items: ListType[List] = []
        self.recent_items: Dict[str, ListType[Item]] = {}
        self.recipes: ListType[Recipe] = []
        self.recipe_data_id: Optional[str] = None
        self._user_data: Optional[Dict[str, Any]] = None
        self.calendar_id: Optional[str] = None

        # WebSocket connection
        self._ws_connection: Optional[websockets.WebSocketServerProtocol] = None
        self._heartbeat_task: Optional[asyncio.Task] = None

        # Load protobuf definitions
        definitions_path = Path(__file__).parent / "definitions.json"
        with open(definitions_path) as f:
            self._protobuf_definitions = json.load(f)

    async def login(self, connect_websocket: bool = True) -> None:
        """Log into the AnyList account."""
        await self._load_credentials()
        self.client_id = await self._get_client_id()

        if not self.access_token or not self.refresh_token:
            print("No saved tokens found, fetching new tokens using credentials")
            await self._fetch_tokens()

        # Update client headers with authentication
        self.client.headers.update(
            {
                "X-AnyLeaf-Client-Identifier": self.client_id,
                "Authorization": f"Bearer {self.access_token}",
            }
        )

        if connect_websocket:
            await self._setup_websocket()

    async def _fetch_tokens(self) -> None:
        """Fetch new access and refresh tokens."""
        data = {"email": self.email, "password": self.password}

        response = await self.auth_client.post("/auth/token", data=data)
        response.raise_for_status()
        result = response.json()

        self.access_token = result["access_token"]
        self.refresh_token = result["refresh_token"]
        await self._store_credentials()

    async def _refresh_tokens(self) -> None:
        """Refresh access token using refresh token."""
        data = {"refresh_token": self.refresh_token}

        try:
            response = await self.auth_client.post("/auth/token/refresh", data=data)
            response.raise_for_status()
            result = response.json()

            self.access_token = result["access_token"]
            self.refresh_token = result["refresh_token"]
            await self._store_credentials()

            # Update client headers
            self.client.headers.update({"Authorization": f"Bearer {self.access_token}"})

        except httpx.HTTPStatusError as e:
            if e.response.status_code != 401:
                raise
            print(
                "Failed to refresh access token, fetching new tokens using credentials"
            )
            await self._fetch_tokens()

    async def _get_client_id(self) -> str:
        """Get or generate client ID."""
        if self.client_id:
            return self.client_id

        print("No saved clientId found, generating new clientId")
        client_id = str(uuid_module.uuid4())
        self.client_id = client_id
        await self._store_credentials()
        return client_id

    async def _load_credentials(self) -> None:
        """Load stored credentials from file."""
        if not self.credentials_file or not self.credentials_file.exists():
            if self.credentials_file:
                print("Credentials file does not exist, not loading saved credentials")
            return

        try:
            encrypted_data = self.credentials_file.read_bytes()
            credentials = self._decrypt_credentials(encrypted_data, self.password)
            self.client_id = credentials.get(CREDENTIALS_KEY_CLIENT_ID)
            self.access_token = credentials.get(CREDENTIALS_KEY_ACCESS_TOKEN)
            self.refresh_token = credentials.get(CREDENTIALS_KEY_REFRESH_TOKEN)
        except Exception as e:
            print(f"Failed to read stored credentials: {e}")

    async def _store_credentials(self) -> None:
        """Store credentials to file."""
        if not self.credentials_file:
            return

        credentials = {
            CREDENTIALS_KEY_CLIENT_ID: self.client_id,
            CREDENTIALS_KEY_ACCESS_TOKEN: self.access_token,
            CREDENTIALS_KEY_REFRESH_TOKEN: self.refresh_token,
        }

        try:
            encrypted_data = self._encrypt_credentials(credentials, self.password)
            self.credentials_file.write_bytes(encrypted_data)
        except Exception as e:
            print(f"Failed to write credentials to storage: {e}")

    def _encrypt_credentials(self, credentials: Dict[str, str], secret: str) -> bytes:
        """Encrypt credentials using password."""
        # Generate key from password
        password_bytes = secret.encode("utf-8")
        salt = os.urandom(16)
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password_bytes))

        # Encrypt credentials
        fernet = Fernet(key)
        plaintext = json.dumps(credentials).encode("utf-8")
        encrypted = fernet.encrypt(plaintext)

        # Combine salt and encrypted data
        return salt + encrypted

    def _decrypt_credentials(
        self, encrypted_data: bytes, secret: str
    ) -> Dict[str, str]:
        """Decrypt credentials using password."""
        # Extract salt and encrypted data
        salt = encrypted_data[:16]
        encrypted = encrypted_data[16:]

        # Derive key from password
        password_bytes = secret.encode("utf-8")
        kdf = PBKDF2HMAC(
            algorithm=hashes.SHA256(),
            length=32,
            salt=salt,
            iterations=100000,
        )
        key = base64.urlsafe_b64encode(kdf.derive(password_bytes))

        # Decrypt credentials
        fernet = Fernet(key)
        plaintext = fernet.decrypt(encrypted)
        return json.loads(plaintext.decode("utf-8"))

    async def _setup_websocket(self) -> None:
        """Setup WebSocket connection for real-time updates."""
        # Note: WebSocket implementation simplified for initial conversion
        # Full WebSocket with protobuf handling would require more complex
        # implementation
        pass

    async def _make_authenticated_request(
        self, method: str, url: str, **kwargs
    ) -> httpx.Response:
        """Make authenticated HTTP request with automatic token refresh."""
        try:
            response = await self.client.request(method, url, **kwargs)
            if response.status_code == 401:
                # Token expired, refresh and retry
                await self._refresh_tokens()
                response = await self.client.request(method, url, **kwargs)
            response.raise_for_status()
            return response
        except httpx.HTTPStatusError as e:
            print(f"Endpoint {url} returned status code {e.response.status_code}")
            raise

    async def get_lists(self, refresh_cache: bool = True) -> ListType[List]:
        """
        Load all lists from account into memory.

        Args:
            refresh_cache: Whether to refresh cached data

        Returns:
            List of shopping lists
        """
        user_data = await self._get_user_data(refresh_cache)

        # Convert protobuf response to Python objects
        # This is simplified - in full implementation would use protobuf library
        lists_data = user_data.get("shoppingListsResponse", {}).get("newLists", [])
        self.lists = [List(list_data, self) for list_data in lists_data]

        # Handle recent items
        recent_lists = (
            user_data.get("starterListsResponse", {})
            .get("recentItemListsResponse", {})
            .get("listResponses", [])
        )
        for response in recent_lists:
            list_data = response.get("starterList", {})
            list_id = list_data.get("listId")
            if list_id:
                items_data = list_data.get("items", [])
                self.recent_items[list_id] = [
                    Item(item_data, self) for item_data in items_data
                ]

        # Handle favorite items
        favorite_lists = (
            user_data.get("starterListsResponse", {})
            .get("favoriteItemListsResponse", {})
            .get("listResponses", [])
        )
        self.favorite_items = [
            List(response.get("starterList", {}), self) for response in favorite_lists
        ]

        return self.lists

    def get_list_by_id(self, identifier: str) -> Optional[List]:
        """Get List instance by ID."""
        return next(
            (
                list_item
                for list_item in self.lists
                if list_item.identifier == identifier
            ),
            None,
        )

    def get_list_by_name(self, name: str) -> Optional[List]:
        """Get List instance by name."""
        return next(
            (list_item for list_item in self.lists if list_item.name == name), None
        )

    def get_favorite_items_by_list_id(self, identifier: str) -> Optional[List]:
        """Get favorite items for a list."""
        return next(
            (
                list_item
                for list_item in self.favorite_items
                if list_item.parent_id == identifier
            ),
            None,
        )

    def get_recent_items_by_list_id(self, list_id: str) -> ListType[Item]:
        """Get recently added items for a list."""
        return self.recent_items.get(list_id, [])

    def create_item(self, item_data: Dict[str, Any]) -> Item:
        """Factory function to create new Items."""
        return Item(item_data, self)

    async def create_event(
        self, event_data: Dict[str, Any]
    ) -> MealPlanningCalendarEvent:
        """Factory function to create a new MealPlanningCalendarEvent."""
        if not self.calendar_id:
            await self._get_user_data()
        return MealPlanningCalendarEvent(event_data, self)

    async def get_recipes(self, refresh_cache: bool = True) -> ListType[Recipe]:
        """
        Load all recipes from account into memory.

        Args:
            refresh_cache: Whether to refresh cached data

        Returns:
            List of recipes
        """
        user_data = await self._get_user_data(refresh_cache)

        recipes_data = user_data.get("recipeDataResponse", {}).get("recipes", [])
        self.recipes = [Recipe(recipe_data, self) for recipe_data in recipes_data]
        self.recipe_data_id = user_data.get("recipeDataResponse", {}).get(
            "recipeDataId"
        )

        return self.recipes

    async def create_recipe(self, recipe_data: Dict[str, Any]) -> Recipe:
        """Factory function to create new Recipes."""
        if not self.recipe_data_id:
            await self.get_recipes()
        return Recipe(recipe_data, self)

    def create_recipe_collection(
        self, collection_data: Dict[str, Any]
    ) -> RecipeCollection:
        """Factory function to create new Recipe Collections."""
        return RecipeCollection(collection_data, self)

    async def _get_user_data(self, refresh_cache: bool = True) -> Dict[str, Any]:
        """Get user data from API."""
        if not self._user_data or refresh_cache:
            response = await self._make_authenticated_request(
                "POST", "/data/user-data/get"
            )

            # In full implementation, this would decode protobuf response
            # For now, we'll simulate the structure
            self._user_data = response.json()  # Simplified

            # Extract calendar ID if available
            calendar_data = self._user_data.get("mealPlanningCalendarResponse", {})
            self.calendar_id = calendar_data.get("calendarId")

        return self._user_data

    async def teardown(self) -> None:
        """Clean up resources."""
        if self._heartbeat_task:
            self._heartbeat_task.cancel()

        if self._ws_connection:
            await self._ws_connection.close()

        await self.client.aclose()
        await self.auth_client.aclose()
