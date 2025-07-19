"""Recipe collection class for AnyList recipe collections."""

import uuid as uuid_module
from typing import TYPE_CHECKING, Any, Dict, Optional
from typing import List as ListType

if TYPE_CHECKING:
    from .anylist import AnyList


class RecipeCollection:
    """
    Recipe collection class representing a collection of recipes.

    Attributes:
        identifier: Unique identifier for this collection
        name: Collection name
        recipe_ids: List of recipe IDs in this collection
    """

    def __init__(self, collection_data: Dict[str, Any], anylist_instance: "AnyList"):
        self._identifier = collection_data.get("identifier") or str(uuid_module.uuid4())
        self._name = collection_data.get("name")
        self._recipe_ids = collection_data.get("recipeIds", [])

        self._anylist = anylist_instance
        self._fields_to_update = []

    @property
    def identifier(self) -> str:
        """Get collection identifier."""
        return self._identifier

    @property
    def name(self) -> Optional[str]:
        """Get collection name."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        """Set collection name."""
        self._name = value
        self._mark_field_for_update("name")

    @property
    def recipe_ids(self) -> ListType[str]:
        """Get list of recipe IDs."""
        return self._recipe_ids.copy()

    def _mark_field_for_update(self, field_name: str) -> None:
        """Mark a field as needing update."""
        if field_name not in self._fields_to_update:
            self._fields_to_update.append(field_name)

    async def add_recipe(self, recipe_id: str) -> None:
        """
        Add a recipe to this collection.

        Args:
            recipe_id: ID of the recipe to add
        """
        if recipe_id not in self._recipe_ids:
            self._recipe_ids.append(recipe_id)

            data = {
                "operation": "add-recipe-to-collection",
                "collectionId": self._identifier,
                "recipeId": recipe_id,
            }

            await self._anylist._make_authenticated_request(
                "POST", "/data/recipe-data/update", json=data
            )

    async def remove_recipe(self, recipe_id: str) -> None:
        """
        Remove a recipe from this collection.

        Args:
            recipe_id: ID of the recipe to remove
        """
        if recipe_id in self._recipe_ids:
            self._recipe_ids.remove(recipe_id)

            data = {
                "operation": "remove-recipe-from-collection",
                "collectionId": self._identifier,
                "recipeId": recipe_id,
            }

            await self._anylist._make_authenticated_request(
                "POST", "/data/recipe-data/update", json=data
            )

    async def save(self) -> "RecipeCollection":
        """
        Save collection changes to the server.

        Returns:
            This collection instance
        """
        if not self._fields_to_update:
            return self

        data = {"operation": "save-recipe-collection", "collection": self.to_dict()}

        await self._anylist._make_authenticated_request(
            "POST", "/data/recipe-data/update", json=data
        )

        self._fields_to_update.clear()
        return self

    async def delete(self) -> None:
        """Delete this recipe collection."""
        data = {
            "operation": "delete-recipe-collection",
            "collectionId": self._identifier,
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/recipe-data/update", json=data
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert collection to dictionary representation."""
        return {
            "identifier": self._identifier,
            "name": self._name,
            "recipeIds": self._recipe_ids,
        }

    def __repr__(self) -> str:
        """String representation of collection."""
        return (
            f"RecipeCollection(identifier='{self._identifier}', "
            f"name='{self._name}', recipes={len(self._recipe_ids)})"
        )
