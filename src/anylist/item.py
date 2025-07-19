"""Item class for AnyList items."""

import uuid as uuid_module
from typing import TYPE_CHECKING, Any, Dict, Optional

if TYPE_CHECKING:
    from .anylist import AnyList


class Item:
    """
    Item class representing a shopping list item.

    Attributes:
        list_id: ID of the list this item belongs to
        identifier: Unique identifier for this item
        name: Item name
        details: Additional details about the item
        quantity: Quantity of the item
        checked: Whether the item is checked off
        manual_sort_index: Manual sort order index
        user_id: ID of user who created the item
        category_match_id: Category this item belongs to
    """

    def __init__(self, item_data: Dict[str, Any], anylist_instance: "AnyList"):
        self._list_id = item_data.get("listId")
        self._identifier = item_data.get("identifier") or str(uuid_module.uuid4())
        self._name = item_data.get("name")
        self._details = item_data.get("details")
        self._quantity = item_data.get("quantity")
        self._checked = item_data.get("checked", False)
        self._manual_sort_index = item_data.get("manualSortIndex")
        self._user_id = item_data.get("userId")
        self._category_match_id = item_data.get("categoryMatchId", "other")

        self._anylist = anylist_instance
        self._fields_to_update = []

    @property
    def list_id(self) -> Optional[str]:
        """Get list ID."""
        return self._list_id

    @list_id.setter
    def list_id(self, value: str) -> None:
        """Set list ID."""
        self._list_id = value
        self._mark_field_for_update("listId")

    @property
    def identifier(self) -> str:
        """Get item identifier."""
        return self._identifier

    @property
    def name(self) -> Optional[str]:
        """Get item name."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        """Set item name."""
        self._name = value
        self._mark_field_for_update("name")

    @property
    def details(self) -> Optional[str]:
        """Get item details."""
        return self._details

    @details.setter
    def details(self, value: str) -> None:
        """Set item details."""
        self._details = value
        self._mark_field_for_update("details")

    @property
    def quantity(self) -> Optional[str]:
        """Get item quantity."""
        return self._quantity

    @quantity.setter
    def quantity(self, value: str) -> None:
        """Set item quantity."""
        self._quantity = value
        self._mark_field_for_update("quantity")

    @property
    def checked(self) -> bool:
        """Get item checked status."""
        return self._checked or False

    @checked.setter
    def checked(self, value: bool) -> None:
        """Set item checked status."""
        self._checked = value
        self._mark_field_for_update("checked")

    @property
    def manual_sort_index(self) -> Optional[int]:
        """Get manual sort index."""
        return self._manual_sort_index

    @manual_sort_index.setter
    def manual_sort_index(self, value: int) -> None:
        """Set manual sort index."""
        self._manual_sort_index = value
        self._mark_field_for_update("manualSortIndex")

    @property
    def user_id(self) -> Optional[str]:
        """Get user ID."""
        return self._user_id

    @property
    def category_match_id(self) -> str:
        """Get category match ID."""
        return self._category_match_id

    @category_match_id.setter
    def category_match_id(self, value: str) -> None:
        """Set category match ID."""
        self._category_match_id = value
        self._mark_field_for_update("categoryMatchId")

    def _mark_field_for_update(self, field_name: str) -> None:
        """Mark a field as needing update."""
        if field_name not in self._fields_to_update:
            self._fields_to_update.append(field_name)

    async def save(self) -> "Item":
        """
        Save item changes to the server.

        Returns:
            This item instance
        """
        if not self._fields_to_update:
            return self

        # Create operation for each field that needs updating
        operations = []

        field_mapping = {
            "name": "set-list-item-name",
            "quantity": "set-list-item-quantity",
            "details": "set-list-item-details",
            "checked": "set-list-item-checked",
            "categoryMatchId": "set-list-item-category-match-id",
            "manualSortIndex": "set-list-item-sort-order",
        }

        for field in self._fields_to_update:
            if field in field_mapping:
                op_data = {
                    "operation": field_mapping[field],
                    "itemId": self._identifier,
                    "listId": self._list_id,
                    "value": getattr(self, f"_{field}"),
                }
                operations.append(op_data)

        # Send operations to server
        if operations:
            data = {"operations": operations}
            await self._anylist._make_authenticated_request(
                "POST", "/data/shopping-lists/update", json=data
            )

        self._fields_to_update.clear()
        return self

    async def delete(self) -> None:
        """Delete this item from its list."""
        data = {
            "operation": "remove-list-item",
            "itemId": self._identifier,
            "listId": self._list_id,
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/shopping-lists/update", json=data
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert item to dictionary representation."""
        return {
            "listId": self._list_id,
            "identifier": self._identifier,
            "name": self._name,
            "details": self._details,
            "quantity": self._quantity,
            "checked": self._checked,
            "manualSortIndex": self._manual_sort_index,
            "userId": self._user_id,
            "categoryMatchId": self._category_match_id,
        }

    def __repr__(self) -> str:
        """String representation of item."""
        return (
            f"Item(identifier='{self._identifier}', "
            f"name='{self._name}', checked={self._checked})"
        )
