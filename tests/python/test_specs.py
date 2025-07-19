"""
Test specifications for AnyList Python API
These tests define the expected behavior that matches the JavaScript implementation
"""

import pytest
import asyncio
from anylist_python import AnyList, Item, List, Recipe, RecipeCollection, MealPlanningCalendarEvent, uuid


class TestAnyListAPI:
    """Test suite for AnyList Python API"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.anylist = AnyList(
            email='test@example.com',
            password='testpassword',
            credentials_file=None
        )
    
    def teardown_method(self):
        """Clean up after tests"""
        if hasattr(self, 'anylist') and self.anylist:
            self.anylist.teardown()
    
    def test_core_api_classes(self):
        """Test that core classes can be imported and used"""
        assert Item is not None
        assert uuid is not None
        assert callable(uuid)
    
    def test_uuid_generation(self):
        """Test UUID generation functionality"""
        id1 = uuid()
        id2 = uuid()
        
        assert isinstance(id1, str)
        assert isinstance(id2, str)
        assert id1 != id2
        assert len(id1) > 0
        assert len(id2) > 0
    
    def test_anylist_instance_creation(self):
        """Test AnyList instance creation with required properties"""
        assert isinstance(self.anylist, AnyList)
        assert self.anylist.email == 'test@example.com'
        assert self.anylist.password == 'testpassword'
        assert self.anylist.lists == []
        assert self.anylist.recipes == []
        assert self.anylist.favorite_items == []
        assert isinstance(self.anylist.recent_items, dict)
    
    def test_anylist_has_core_methods(self):
        """Test that AnyList has all required methods"""
        assert callable(getattr(self.anylist, 'login', None))
        assert callable(getattr(self.anylist, 'get_lists', None))
        assert callable(getattr(self.anylist, 'get_recipes', None))
        assert callable(getattr(self.anylist, 'create_item', None))
        assert callable(getattr(self.anylist, 'create_recipe', None))
        assert callable(getattr(self.anylist, 'create_event', None))
        assert callable(getattr(self.anylist, 'create_recipe_collection', None))
        assert callable(getattr(self.anylist, 'teardown', None))
        assert callable(getattr(self.anylist, 'get_list_by_name', None))
        assert callable(getattr(self.anylist, 'get_list_by_id', None))
    
    def test_event_emitter_functionality(self):
        """Test event emitter methods"""
        assert callable(getattr(self.anylist, 'on', None))
        assert callable(getattr(self.anylist, 'emit', None))
        assert callable(getattr(self.anylist, 'remove_listener', None))
    
    def test_item_creation_basic(self):
        """Test creating item with basic properties"""
        item = self.anylist.create_item({'name': 'Test Item'})
        
        assert item is not None
        assert item.name == 'Test Item'
        assert isinstance(item.identifier, str)
        assert len(item.identifier) > 0
        assert callable(getattr(item, 'save', None))
    
    def test_item_creation_complex(self):
        """Test creating item with all properties"""
        item_data = {
            'name': 'Complex Item',
            'quantity': '2 lbs',
            'details': 'Organic preferred',
            'checked': False,
            'identifier': 'test-id-123'
        }
        
        item = self.anylist.create_item(item_data)
        
        assert item.name == item_data['name']
        assert item.quantity == item_data['quantity']
        assert item.details == item_data['details']
        assert item.checked == item_data['checked']
        assert item.identifier == item_data['identifier']
    
    def test_item_property_setters(self):
        """Test item property getters and setters"""
        mock_context = {
            'client': {'post': lambda: None},
            'protobuf': {'PBListOperation': lambda: None},
            'uid': 'test-uid'
        }
        
        item = Item({'name': 'Test'}, mock_context)
        
        # Test setting properties
        item.name = 'Updated Name'
        item.quantity = '3 units'
        item.checked = True
        
        assert item.name == 'Updated Name'
        assert item.quantity == '3 units'
        assert item.checked == True
    
    def test_recipe_creation_basic(self):
        """Test creating recipe with basic properties"""
        recipe = self.anylist.create_recipe({'name': 'Test Recipe'})
        
        assert recipe is not None
        assert recipe.name == 'Test Recipe'
        assert isinstance(recipe.identifier, str)
        assert callable(getattr(recipe, 'save', None))
        assert callable(getattr(recipe, 'delete', None))
    
    def test_recipe_creation_complex(self):
        """Test creating recipe with complex properties"""
        recipe_data = {
            'name': 'Complex Recipe',
            'note': 'Test recipe note',
            'preparationSteps': ['Step 1', 'Step 2'],
            'servings': '4 servings',
            'sourceName': 'Test Source',
            'sourceUrl': 'https://example.com',
            'rating': 5,
            'ingredients': [{
                'rawIngredient': '1 cup flour',
                'name': 'flour',
                'quantity': '1 cup'
            }],
            'cookTime': 300,  # 5 minutes in seconds
            'prepTime': 600   # 10 minutes in seconds
        }
        
        recipe = self.anylist.create_recipe(recipe_data)
        
        assert recipe.name == recipe_data['name']
        assert recipe.note == recipe_data['note']
        assert recipe.preparation_steps == recipe_data['preparationSteps']
        assert recipe.servings == recipe_data['servings']
        assert recipe.rating == recipe_data['rating']
        assert recipe.cook_time == recipe_data['cookTime']
        assert recipe.prep_time == recipe_data['prepTime']
    
    def test_calendar_event_creation(self):
        """Test creating calendar event"""
        event = self.anylist.create_event({'title': 'Test Event'})
        
        assert event is not None
        assert event.title == 'Test Event'
        assert callable(getattr(event, 'save', None))
        assert callable(getattr(event, 'delete', None))
    
    def test_recipe_collection_creation(self):
        """Test creating recipe collection"""
        collection = self.anylist.create_recipe_collection({'name': 'Test Collection'})
        
        assert collection is not None
        assert collection.name == 'Test Collection'
        assert callable(getattr(collection, 'save', None))
        assert callable(getattr(collection, 'delete', None))
        assert callable(getattr(collection, 'add_recipe', None))
        assert callable(getattr(collection, 'remove_recipe', None))
    
    def test_list_management_methods(self):
        """Test list management functionality"""
        # Test getting non-existent list
        result = self.anylist.get_list_by_name('NonExistentList')
        assert result is None
    
    def test_api_method_signatures(self):
        """Test that all expected API methods exist with correct signatures"""
        expected_methods = [
            'login',
            'get_lists',
            'get_recipes', 
            'create_item',
            'create_recipe',
            'create_event',
            'create_recipe_collection',
            'teardown',
            'get_list_by_name',
            'get_list_by_id'
        ]
        
        for method_name in expected_methods:
            assert hasattr(self.anylist, method_name)
            assert callable(getattr(self.anylist, method_name))
    
    def test_data_structure_requirements(self):
        """Test that data structures meet requirements"""
        # Test expected item properties
        expected_item_properties = [
            'identifier',
            'name',
            'quantity',
            'details', 
            'checked',
            'list_id',
            'save'
        ]
        
        item = self.anylist.create_item({'name': 'Test'})
        for prop in ['identifier', 'name', 'list_id']:
            assert hasattr(item, prop)
        assert callable(getattr(item, 'save'))
        
        # Test expected recipe properties  
        expected_recipe_properties = [
            'identifier',
            'name',
            'note',
            'preparation_steps',
            'servings',
            'rating',
            'ingredients',
            'cook_time',
            'prep_time',
            'save',
            'delete'
        ]
        
        recipe = self.anylist.create_recipe({'name': 'Test Recipe'})
        for prop in ['identifier', 'name', 'note']:
            assert hasattr(recipe, prop)
        assert callable(getattr(recipe, 'save'))
        assert callable(getattr(recipe, 'delete'))


# Async test support
class TestAnyListAPIAsync:
    """Test async functionality"""
    
    def setup_method(self):
        """Set up test fixtures"""
        self.anylist = AnyList(
            email='test@example.com',
            password='testpassword',
            credentials_file=None
        )
    
    def teardown_method(self):
        """Clean up after tests"""
        if hasattr(self, 'anylist') and self.anylist:
            self.anylist.teardown()
    
    @pytest.mark.asyncio
    async def test_login_functionality(self):
        """Test login method"""
        result = await self.anylist.login(connect_websocket=False)
        assert result is True
    
    @pytest.mark.asyncio
    async def test_get_lists_functionality(self):
        """Test get_lists method"""
        lists = await self.anylist.get_lists(refresh_cache=False)
        assert isinstance(lists, list)
    
    @pytest.mark.asyncio
    async def test_get_recipes_functionality(self):
        """Test get_recipes method"""
        recipes = await self.anylist.get_recipes(refresh_cache=False)
        assert isinstance(recipes, list)


if __name__ == '__main__':
    pytest.main([__file__])