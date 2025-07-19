"""List class for AnyList shopping lists."""

from typing import TYPE_CHECKING, Any, Dict, Optional
from typing import List as ListType

from .item import Item

if TYPE_CHECKING:
    from .anylist import AnyList


class List:
    """
    List class representing a shopping list.

    Attributes:
        identifier: Unique identifier for this list
        parent_id: Parent list ID
        name: List name
        items: List of items in this list
    """

    def __init__(self, list_data: Dict[str, Any], anylist_instance: "AnyList"):
        self.identifier = list_data.get("identifier")
        self.parent_id = list_data.get("listId")
        self.name = list_data.get("name")

        # Convert item data to Item objects
        items_data = list_data.get("items", [])
        self.items = [Item(item_data, anylist_instance) for item_data in items_data]

        self._anylist = anylist_instance

    async def add_item(self, item: Item, is_favorite: bool = False) -> Item:
        """
        Add an item to this list.

        Args:
            item: Item instance to add
            is_favorite: Whether this is being added to favorites list

        Returns:
            The added item

        Raises:
            TypeError: If item is not an Item instance
        """
        if not isinstance(item, Item):
            raise TypeError("Must be an instance of the Item class.")

        item.list_id = self.identifier

        # Create operation data
        op_data = {
            "operation": "add-list-item",
            "listId": self.identifier,
            "item": item.to_dict(),
        }

        if is_favorite:
            op_data["isFavorite"] = True

        # Send to server
        await self._anylist._make_authenticated_request(
            "POST", "/data/shopping-lists/update", json=op_data
        )

        # Add to local list
        self.items.append(item)

        return item

    async def remove_item(self, item: Item) -> None:
        """
        Remove an item from this list.

        Args:
            item: Item instance to remove

        Raises:
            TypeError: If item is not an Item instance
        """
        if not isinstance(item, Item):
            raise TypeError("Must be an instance of the Item class.")

        # Delete from server
        await item.delete()

        # Remove from local list
        if item in self.items:
            self.items.remove(item)

    def get_item_by_name(self, name: str) -> Optional[Item]:
        """
        Get an item by name.

        Args:
            name: Name of the item to find

        Returns:
            Item if found, None otherwise
        """
        return next((item for item in self.items if item.name == name), None)

    def get_item_by_id(self, identifier: str) -> Optional[Item]:
        """
        Get an item by identifier.

        Args:
            identifier: Identifier of the item to find

        Returns:
            Item if found, None otherwise
        """
        return next(
            (item for item in self.items if item.identifier == identifier), None
        )

    def get_checked_items(self) -> ListType[Item]:
        """Get all checked items in this list."""
        return [item for item in self.items if item.checked]

    def get_unchecked_items(self) -> ListType[Item]:
        """Get all unchecked items in this list."""
        return [item for item in self.items if not item.checked]

    async def clear_checked_items(self) -> None:
        """Remove all checked items from this list."""
        checked_items = self.get_checked_items()
        for item in checked_items:
            await self.remove_item(item)

    def to_dict(self) -> Dict[str, Any]:
        """Convert list to dictionary representation."""
        return {
            "identifier": self.identifier,
            "listId": self.parent_id,
            "name": self.name,
            "items": [item.to_dict() for item in self.items],
        }

    def __repr__(self) -> str:
        """String representation of list."""
        return (
            f"List(identifier='{self.identifier}', "
            f"name='{self.name}', items={len(self.items)})"
        )

    def __len__(self) -> int:
        """Get number of items in list."""
        return len(self.items)

    def __iter__(self):
        """Iterate over items in list."""
        return iter(self.items)
