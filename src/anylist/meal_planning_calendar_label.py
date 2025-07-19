"""Meal planning calendar label class for AnyList."""

from typing import TYPE_CHECKING, Any, Dict, Optional

if TYPE_CHECKING:
    pass


class MealPlanningCalendarLabel:
    """
    Meal planning calendar label class.

    Attributes:
        identifier: Unique identifier for this label
        name: Label name
        color: Label color
    """

    def __init__(self, label_data: Dict[str, Any]):
        self._identifier = label_data.get("identifier")
        self._name = label_data.get("name")
        self._color = label_data.get("color")

    @property
    def identifier(self) -> Optional[str]:
        """Get label identifier."""
        return self._identifier

    @property
    def name(self) -> Optional[str]:
        """Get label name."""
        return self._name

    @property
    def color(self) -> Optional[str]:
        """Get label color."""
        return self._color

    def to_dict(self) -> Dict[str, Any]:
        """Convert label to dictionary representation."""
        return {
            "identifier": self._identifier,
            "name": self._name,
            "color": self._color,
        }

    def __repr__(self) -> str:
        """String representation of label."""
        return (
            f"MealPlanningCalendarLabel(identifier='{self._identifier}', "
            f"name='{self._name}', color='{self._color}')"
        )
