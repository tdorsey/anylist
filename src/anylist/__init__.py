"""
📋 AnyList - a wrapper for AnyList's API (unofficial, reverse engineered)

A Python library for interacting with AnyList's API to manage shopping lists,
recipes, and meal planning.
"""

from .anylist import AnyList
from .item import Item
from .list import List
from .meal_planning_calendar_event import MealPlanningCalendarEvent
from .meal_planning_calendar_label import MealPlanningCalendarLabel
from .recipe import Recipe
from .recipe_collection import RecipeCollection

__version__ = "0.8.5"
__author__ = "Max Isom"
__email__ = "hi@maxisom.me"

__all__ = [
    "AnyList",
    "List",
    "Item",
    "Recipe",
    "RecipeCollection",
    "MealPlanningCalendarEvent",
    "MealPlanningCalendarLabel",
]
