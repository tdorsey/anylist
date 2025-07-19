"""Meal planning calendar event class for AnyList."""

import uuid as uuid_module
from typing import TYPE_CHECKING, Any, Dict, Optional

if TYPE_CHECKING:
    from .anylist import AnyList
    from .meal_planning_calendar_label import MealPlanningCalendarLabel
    from .recipe import Recipe


class MealPlanningCalendarEvent:
    """
    Meal planning calendar event class.

    Attributes:
        identifier: Unique identifier for this event
        title: Event title
        start_date: Start date timestamp
        end_date: End date timestamp
        recipe_id: Associated recipe ID
        label_id: Associated label ID
        recipe: Associated recipe object (loaded separately)
        label: Associated label object (loaded separately)
    """

    def __init__(self, event_data: Dict[str, Any], anylist_instance: "AnyList"):
        self._identifier = event_data.get("identifier") or str(uuid_module.uuid4())
        self._title = event_data.get("title")
        self._start_date = event_data.get("startDate")
        self._end_date = event_data.get("endDate")
        self._recipe_id = event_data.get("recipeId")
        self._label_id = event_data.get("labelId")

        self._anylist = anylist_instance
        self._fields_to_update = []

        # These are populated by the AnyList instance when loading events
        self.recipe: Optional[Recipe] = None
        self.label: Optional[MealPlanningCalendarLabel] = None

    @property
    def identifier(self) -> str:
        """Get event identifier."""
        return self._identifier

    @property
    def title(self) -> Optional[str]:
        """Get event title."""
        return self._title

    @title.setter
    def title(self, value: str) -> None:
        """Set event title."""
        self._title = value
        self._mark_field_for_update("title")

    @property
    def start_date(self) -> Optional[float]:
        """Get start date timestamp."""
        return self._start_date

    @start_date.setter
    def start_date(self, value: float) -> None:
        """Set start date timestamp."""
        self._start_date = value
        self._mark_field_for_update("startDate")

    @property
    def end_date(self) -> Optional[float]:
        """Get end date timestamp."""
        return self._end_date

    @end_date.setter
    def end_date(self, value: float) -> None:
        """Set end date timestamp."""
        self._end_date = value
        self._mark_field_for_update("endDate")

    @property
    def recipe_id(self) -> Optional[str]:
        """Get recipe ID."""
        return self._recipe_id

    @recipe_id.setter
    def recipe_id(self, value: str) -> None:
        """Set recipe ID."""
        self._recipe_id = value
        self._mark_field_for_update("recipeId")

    @property
    def label_id(self) -> Optional[str]:
        """Get label ID."""
        return self._label_id

    @label_id.setter
    def label_id(self, value: str) -> None:
        """Set label ID."""
        self._label_id = value
        self._mark_field_for_update("labelId")

    def _mark_field_for_update(self, field_name: str) -> None:
        """Mark a field as needing update."""
        if field_name not in self._fields_to_update:
            self._fields_to_update.append(field_name)

    async def save(self) -> "MealPlanningCalendarEvent":
        """
        Save event changes to the server.

        Returns:
            This event instance
        """
        data = {
            "operation": "save-meal-planning-event",
            "calendarId": self._anylist.calendar_id,
            "event": self.to_dict(),
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/meal-planning-calendar/update", json=data
        )

        self._fields_to_update.clear()
        return self

    async def delete(self) -> None:
        """Delete this event."""
        data = {
            "operation": "delete-meal-planning-event",
            "calendarId": self._anylist.calendar_id,
            "eventId": self._identifier,
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/meal-planning-calendar/update", json=data
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert event to dictionary representation."""
        return {
            "identifier": self._identifier,
            "title": self._title,
            "startDate": self._start_date,
            "endDate": self._end_date,
            "recipeId": self._recipe_id,
            "labelId": self._label_id,
        }

    def __repr__(self) -> str:
        """String representation of event."""
        return (
            f"MealPlanningCalendarEvent(identifier='{self._identifier}', "
            f"title='{self._title}')"
        )
