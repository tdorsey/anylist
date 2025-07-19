"""Recipe class for AnyList recipes."""

import time
import uuid as uuid_module
from typing import TYPE_CHECKING, Any, Dict, Optional
from typing import List as ListType

if TYPE_CHECKING:
    from .anylist import AnyList


class Recipe:
    """
    Recipe class representing a recipe.

    Attributes:
        identifier: Unique identifier for this recipe
        name: Recipe name
        note: Recipe notes
        preparation_steps: List of preparation steps
        servings: Serving information
        source_name: Source name
        source_url: Source URL
        scale_factor: Scale factor for ingredients
        rating: Recipe rating (1-5)
        ingredients: List of ingredients
        nutritional_info: Nutritional information
        cook_time: Cooking time in seconds
        prep_time: Preparation time in seconds
        creation_timestamp: Creation time
        timestamp: Last modified time
    """

    def __init__(self, recipe_data: Dict[str, Any], anylist_instance: "AnyList"):
        self._identifier = recipe_data.get("identifier") or str(uuid_module.uuid4())
        self._name = recipe_data.get("name")
        self._note = recipe_data.get("note")
        self._preparation_steps = recipe_data.get("preparationSteps", [])
        self._servings = recipe_data.get("servings")
        self._source_name = recipe_data.get("sourceName")
        self._source_url = recipe_data.get("sourceUrl")
        self._scale_factor = recipe_data.get("scaleFactor", 1.0)
        self._rating = recipe_data.get("rating")
        self._ingredients = recipe_data.get("ingredients", [])
        self._nutritional_info = recipe_data.get("nutritionalInfo")
        self._cook_time = recipe_data.get("cookTime")
        self._prep_time = recipe_data.get("prepTime")
        self._creation_timestamp = recipe_data.get("creationTimestamp", time.time())
        self._timestamp = recipe_data.get("timestamp", time.time())

        self._anylist = anylist_instance
        self._fields_to_update = []

    @property
    def identifier(self) -> str:
        """Get recipe identifier."""
        return self._identifier

    @property
    def name(self) -> Optional[str]:
        """Get recipe name."""
        return self._name

    @name.setter
    def name(self, value: str) -> None:
        """Set recipe name."""
        self._name = value
        self._mark_field_for_update("name")

    @property
    def note(self) -> Optional[str]:
        """Get recipe note."""
        return self._note

    @note.setter
    def note(self, value: str) -> None:
        """Set recipe note."""
        self._note = value
        self._mark_field_for_update("note")

    @property
    def preparation_steps(self) -> ListType[str]:
        """Get preparation steps."""
        return self._preparation_steps

    @preparation_steps.setter
    def preparation_steps(self, value: ListType[str]) -> None:
        """Set preparation steps."""
        self._preparation_steps = value
        self._mark_field_for_update("preparationSteps")

    @property
    def servings(self) -> Optional[str]:
        """Get servings information."""
        return self._servings

    @servings.setter
    def servings(self, value: str) -> None:
        """Set servings information."""
        self._servings = value
        self._mark_field_for_update("servings")

    @property
    def source_name(self) -> Optional[str]:
        """Get source name."""
        return self._source_name

    @source_name.setter
    def source_name(self, value: str) -> None:
        """Set source name."""
        self._source_name = value
        self._mark_field_for_update("sourceName")

    @property
    def source_url(self) -> Optional[str]:
        """Get source URL."""
        return self._source_url

    @source_url.setter
    def source_url(self, value: str) -> None:
        """Set source URL."""
        self._source_url = value
        self._mark_field_for_update("sourceUrl")

    @property
    def scale_factor(self) -> float:
        """Get scale factor."""
        return self._scale_factor

    @scale_factor.setter
    def scale_factor(self, value: float) -> None:
        """Set scale factor."""
        self._scale_factor = value
        self._mark_field_for_update("scaleFactor")

    @property
    def rating(self) -> Optional[int]:
        """Get recipe rating."""
        return self._rating

    @rating.setter
    def rating(self, value: int) -> None:
        """Set recipe rating."""
        if value < 1 or value > 5:
            raise ValueError("Rating must be between 1 and 5")
        self._rating = value
        self._mark_field_for_update("rating")

    @property
    def ingredients(self) -> ListType[Dict[str, Any]]:
        """Get ingredients list."""
        return self._ingredients

    @ingredients.setter
    def ingredients(self, value: ListType[Dict[str, Any]]) -> None:
        """Set ingredients list."""
        self._ingredients = value
        self._mark_field_for_update("ingredients")

    @property
    def nutritional_info(self) -> Optional[str]:
        """Get nutritional information."""
        return self._nutritional_info

    @nutritional_info.setter
    def nutritional_info(self, value: str) -> None:
        """Set nutritional information."""
        self._nutritional_info = value
        self._mark_field_for_update("nutritionalInfo")

    @property
    def cook_time(self) -> Optional[int]:
        """Get cook time in seconds."""
        return self._cook_time

    @cook_time.setter
    def cook_time(self, value: int) -> None:
        """Set cook time in seconds."""
        self._cook_time = value
        self._mark_field_for_update("cookTime")

    @property
    def prep_time(self) -> Optional[int]:
        """Get prep time in seconds."""
        return self._prep_time

    @prep_time.setter
    def prep_time(self, value: int) -> None:
        """Set prep time in seconds."""
        self._prep_time = value
        self._mark_field_for_update("prepTime")

    @property
    def creation_timestamp(self) -> float:
        """Get creation timestamp."""
        return self._creation_timestamp

    @property
    def timestamp(self) -> float:
        """Get last modified timestamp."""
        return self._timestamp

    def _mark_field_for_update(self, field_name: str) -> None:
        """Mark a field as needing update."""
        if field_name not in self._fields_to_update:
            self._fields_to_update.append(field_name)
        self._timestamp = time.time()

    async def save(self) -> "Recipe":
        """
        Save recipe changes to the server.

        Returns:
            This recipe instance
        """
        if not self._fields_to_update:
            return self

        # Create recipe data for API
        recipe_data = self.to_dict()

        data = {
            "operation": "save-recipe",
            "recipeDataId": self._anylist.recipe_data_id,
            "recipe": recipe_data,
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/recipe-data/update", json=data
        )

        self._fields_to_update.clear()
        return self

    async def delete(self) -> None:
        """Delete this recipe."""
        data = {
            "operation": "delete-recipe",
            "recipeDataId": self._anylist.recipe_data_id,
            "recipeId": self._identifier,
        }

        await self._anylist._make_authenticated_request(
            "POST", "/data/recipe-data/update", json=data
        )

    def to_dict(self) -> Dict[str, Any]:
        """Convert recipe to dictionary representation."""
        return {
            "identifier": self._identifier,
            "name": self._name,
            "note": self._note,
            "preparationSteps": self._preparation_steps,
            "servings": self._servings,
            "sourceName": self._source_name,
            "sourceUrl": self._source_url,
            "scaleFactor": self._scale_factor,
            "rating": self._rating,
            "ingredients": self._ingredients,
            "nutritionalInfo": self._nutritional_info,
            "cookTime": self._cook_time,
            "prepTime": self._prep_time,
            "creationTimestamp": self._creation_timestamp,
            "timestamp": self._timestamp,
        }

    def __repr__(self) -> str:
        """String representation of recipe."""
        return (
            f"Recipe(identifier='{self._identifier}', "
            f"name='{self._name}', rating={self._rating})"
        )
