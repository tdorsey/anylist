/**
 * Integration tests for the AnyList library
 * These tests focus on integration between components without making real API calls
 */

const {Buffer} = require('buffer');
const Item = require('../lib/item');
const List = require('../lib/list');
const Recipe = require('../lib/recipe');
const RecipeCollection = require('../lib/recipe-collection');
const MealPlanningCalendarEvent = require('../lib/meal-planning-calendar-event');

describe('AnyList Component Integration Tests', () => {
	let mockContext;

	beforeEach(() => {
		// Mock the context object passed to all components
		mockContext = {
			client: {
				post: jest.fn().mockResolvedValue({body: Buffer.from('success')}),
			},
			protobuf: {
				ListItem: jest.fn().mockImplementation(data => data),
				PBRecipe: jest.fn().mockImplementation(data => data),
				PBRecipeCollection: jest.fn().mockImplementation(data => data),
				PBCalendarEvent: jest.fn().mockImplementation(data => data),
				PBIngredient: jest.fn().mockImplementation(data => data),
				PBListOperation: jest.fn().mockImplementation(() => ({
					setMetadata: jest.fn(),
					setListItemOperation: jest.fn(),
					setCreateItem: jest.fn(),
					setUpdateItem: jest.fn(),
					setDeleteItem: jest.fn(),
					setUserId: jest.fn(),
					setListId: jest.fn(),
					setListItemId: jest.fn(),
					setListItem: jest.fn(),
					setUpdatedValue: jest.fn(),
				})),
				PBListOperationList: jest.fn().mockImplementation(() => ({
					setOperations: jest.fn(),
					encode: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
					toBuffer: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
				})),
				PBRecipeOperationList: jest.fn().mockImplementation(() => ({
					setOperations: jest.fn(),
					encode: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
					toBuffer: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
				})),
				PBRecipeOperation: jest.fn().mockImplementation(() => ({
					setMetadata: jest.fn(),
					setCreateRecipe: jest.fn(),
					setUpdateRecipe: jest.fn(),
					setDeleteRecipe: jest.fn(),
					setRecipeDataId: jest.fn(),
					setRecipe: jest.fn(),
					setRecipeIds: jest.fn(),
					setRecipeCollection: jest.fn(),
				})),
				PBRecipeCollectionSettings: jest.fn().mockImplementation(() => ({
					setName: jest.fn(),
				})),
				PBRecipeCollectionOperationList: jest.fn().mockImplementation(() => ({
					setOperations: jest.fn(),
					encode: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
					toBuffer: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
				})),
				PBRecipeCollectionOperation: jest.fn().mockImplementation(() => ({
					setMetadata: jest.fn(),
					setCreateRecipeCollection: jest.fn(),
					setUpdateRecipeCollection: jest.fn(),
					setDeleteRecipeCollection: jest.fn(),
					setRecipeDataId: jest.fn(),
					setRecipeCollection: jest.fn(),
				})),
				PBCalendarOperationList: jest.fn().mockImplementation(() => ({
					setOperations: jest.fn(),
					encode: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
					toBuffer: jest.fn().mockReturnValue(Buffer.from('encoded-data')),
				})),
				PBCalendarOperation: jest.fn().mockImplementation(() => ({
					setMetadata: jest.fn(),
					setCreateEvent: jest.fn(),
					setUpdateEvent: jest.fn(),
					setDeleteEvent: jest.fn(),
					setCalendarId: jest.fn(),
					setUpdatedEvent: jest.fn(),
				})),
			},
			uid: 'test-user-id',
			calendarId: 'test-calendar-id',
			recipeDataId: 'recipe-data-123',
		};

		jest.clearAllMocks();
	});

	describe('Item Integration', () => {
		test('should create item with proper initialization', () => {
			const itemData = {
				identifier: 'item-123',
				listId: 'list-456',
				name: 'Test Item',
				quantity: '2 lbs',
				details: 'Fresh and organic',
				checked: false,
				categoryMatchId: 'produce',
			};

			const item = new Item(itemData, mockContext);

			expect(item.identifier).toBe('item-123');
			expect(item.listId).toBe('list-456');
			expect(item.name).toBe('Test Item');
			expect(item.quantity).toBe('2 lbs');
			expect(item.details).toBe('Fresh and organic');
			expect(item.checked).toBe(false);
			expect(item.categoryMatchId).toBe('produce');
		});

		test('should track field changes for updates', () => {
			const item = new Item({name: 'Original'}, mockContext);

			item.name = 'Updated Name';
			item.quantity = '5';
			item.checked = true;

			expect(item._fieldsToUpdate).toContain('name');
			expect(item._fieldsToUpdate).toContain('quantity');
			expect(item._fieldsToUpdate).toContain('checked');
		});

		test('should save item changes via API', async () => {
			const item = new Item({
				identifier: 'item-123',
				listId: 'list-456',
				name: 'Test Item',
			}, mockContext);

			item.name = 'Updated Item';
			await item.save();

			expect(mockContext.client.post).toHaveBeenCalledWith('data/shopping-lists/update', expect.any(Object));
			expect(mockContext.protobuf.PBListOperation).toHaveBeenCalled();
		});
	});

	describe('List Integration', () => {
		test('should create list with items', () => {
			const listData = {
				identifier: 'list-123',
				listId: 'list-123',
				name: 'Grocery List',
				items: [
					{
						identifier: 'item-1',
						listId: 'list-123',
						name: 'Apples',
						quantity: '3',
					},
					{
						identifier: 'item-2',
						listId: 'list-123',
						name: 'Bread',
						quantity: '1 loaf',
					},
				],
			};

			const list = new List(listData, mockContext);

			expect(list.identifier).toBe('list-123');
			expect(list.name).toBe('Grocery List');
			expect(list.items).toHaveLength(2);
			expect(list.items[0]).toBeInstanceOf(Item);
			expect(list.items[0].name).toBe('Apples');
			expect(list.items[1].name).toBe('Bread');
		});

		test('should add item to list', async () => {
			const list = new List({
				identifier: 'list-123',
				listId: 'list-123',
				name: 'Test List',
				items: [],
			}, mockContext);

			const newItem = new Item({
				name: 'New Item',
				quantity: '1',
			}, mockContext);

			const addedItem = await list.addItem(newItem);

			expect(addedItem.listId).toBe('list-123');
			expect(list.items).toContain(addedItem);
			expect(mockContext.client.post).toHaveBeenCalledWith('data/shopping-lists/update', expect.any(Object));
		});

		test('should remove item from list', async () => {
			const existingItem = new Item({
				identifier: 'item-1',
				listId: 'list-123',
				name: 'Existing Item',
			}, mockContext);

			const list = new List({
				identifier: 'list-123',
				listId: 'list-123',
				name: 'Test List',
				items: [existingItem],
			}, mockContext);

			await list.removeItem(existingItem);

			expect(list.items).not.toContain(existingItem);
			expect(mockContext.client.post).toHaveBeenCalledWith('data/shopping-lists/update', expect.any(Object));
		});

		test('should get item by name', () => {
			const list = new List({
				identifier: 'list-123',
				listId: 'list-123',
				name: 'Test List',
				items: [
					{
						identifier: 'item-1',
						listId: 'list-123',
						name: 'Apples',
					},
					{
						identifier: 'item-2',
						listId: 'list-123',
						name: 'Bananas',
					},
				],
			}, mockContext);

			const apple = list.getItemByName('Apples');
			const banana = list.getItemByName('Bananas');
			const missing = list.getItemByName('Oranges');

			expect(apple).toBeInstanceOf(Item);
			expect(apple.name).toBe('Apples');
			expect(banana.name).toBe('Bananas');
			expect(missing).toBeUndefined();
		});
	});

	describe('Recipe Integration', () => {
		test('should create recipe with all properties', () => {
			const recipeData = {
				identifier: 'recipe-123',
				name: 'Test Recipe',
				note: 'A delicious test recipe',
				preparationSteps: ['Step 1: Prep', 'Step 2: Cook'],
				servings: '4 servings',
				ingredients: [
					{
						rawIngredient: '1 cup flour',
						name: 'flour',
						quantity: '1 cup',
						note: 'all-purpose',
					},
					{
						rawIngredient: '2 eggs',
						name: 'eggs',
						quantity: '2',
						note: 'large',
					},
				],
				cookTime: 1800, // 30 minutes
				prepTime: 900, // 15 minutes
				rating: 5,
				nutritionalInfo: 'High in protein',
				sourceName: 'Test Kitchen',
				sourceUrl: 'https://example.com/recipe',
			};

			const recipe = new Recipe(recipeData, mockContext);

			expect(recipe.identifier).toBe('recipe-123');
			expect(recipe.name).toBe('Test Recipe');
			expect(recipe.note).toBe('A delicious test recipe');
			expect(recipe.preparationSteps).toEqual(['Step 1: Prep', 'Step 2: Cook']);
			expect(recipe.servings).toBe('4 servings');
			expect(recipe.ingredients).toHaveLength(2);
			expect(recipe.ingredients[0].name).toBe('flour');
			expect(recipe.cookTime).toBe(1800);
			expect(recipe.prepTime).toBe(900);
			expect(recipe.rating).toBe(5);
		});

		test('should save recipe via API', async () => {
			const recipe = new Recipe({
				name: 'New Recipe',
				preparationSteps: ['Mix ingredients'],
			}, mockContext);

			await recipe.save();

			expect(mockContext.client.post).toHaveBeenCalledWith('data/user-recipe-data/update', expect.any(Object));
		});

		test('should delete recipe via API', async () => {
			const recipe = new Recipe({
				identifier: 'recipe-123',
				name: 'Recipe to Delete',
			}, mockContext);

			await recipe.delete();

			expect(mockContext.client.post).toHaveBeenCalledWith('data/user-recipe-data/update', expect.any(Object));
		});
	});

	describe('Recipe Collection Integration', () => {
		test('should create recipe collection', () => {
			const collectionData = {
				identifier: 'collection-123',
				name: 'My Favorite Recipes',
			};

			const collection = new RecipeCollection(collectionData, mockContext);

			expect(collection.identifier).toBe('collection-123');
			expect(collection.name).toBe('My Favorite Recipes');
		});

		test('should add recipe to collection', async () => {
			const collection = new RecipeCollection({
				name: 'Test Collection',
			}, mockContext);

			await collection.addRecipe('recipe-456');

			expect(mockContext.client.post).toHaveBeenCalledWith('data/user-recipe-data/update', expect.any(Object));
		});

		test('should remove recipe from collection', async () => {
			const collection = new RecipeCollection({
				identifier: 'collection-123',
				name: 'Test Collection',
				recipeIds: ['recipe-456'], // Include the recipe we want to remove
			}, mockContext);

			await collection.removeRecipe('recipe-456');

			expect(mockContext.client.post).toHaveBeenCalledWith('data/user-recipe-data/update', expect.any(Object));
			expect(collection.recipeIds).not.toContain('recipe-456');
		});
	});

	describe('Meal Planning Calendar Event Integration', () => {
		test('should create calendar event', () => {
			const eventData = {
				identifier: 'event-123',
				title: 'Dinner Plan',
				date: new Date('2024-01-15T18:00:00Z'),
				recipeId: 'recipe-456',
				labelId: 'label-789',
			};

			const event = new MealPlanningCalendarEvent(eventData, mockContext);

			expect(event.identifier).toBe('event-123');
			expect(event.title).toBe('Dinner Plan');
			expect(event.date).toEqual(new Date('2024-01-15T18:00:00Z'));
			expect(event.recipeId).toBe('recipe-456');
			expect(event.labelId).toBe('label-789');
		});

		test('should save calendar event via API', async () => {
			const event = new MealPlanningCalendarEvent({
				title: 'New Event',
				date: new Date(),
			}, mockContext);

			await event.save();

			expect(mockContext.client.post).toHaveBeenCalledWith('data/meal-planning-calendar/update', expect.any(Object));
		});
	});

	describe('End-to-End Integration Workflows', () => {
		test('should complete full list management workflow', async () => {
			// 1. Create a new list
			const list = new List({
				identifier: 'workflow-list',
				listId: 'workflow-list',
				name: 'Integration Test List',
				items: [],
			}, mockContext);

			// 2. Create multiple items
			const item1 = new Item({name: 'Apples', quantity: '3'}, mockContext);
			const item2 = new Item({name: 'Bread', quantity: '1 loaf'}, mockContext);
			const item3 = new Item({name: 'Milk', quantity: '1 gallon'}, mockContext);

			// 3. Add items to list
			await list.addItem(item1);
			await list.addItem(item2);
			await list.addItem(item3);

			expect(list.items).toHaveLength(3);
			expect(mockContext.client.post).toHaveBeenCalledTimes(3);

			// 4. Update an item
			item1.checked = true;
			item1.quantity = '5';
			await item1.save();

			expect(mockContext.client.post).toHaveBeenCalledTimes(4);

			// 5. Find and remove an item
			const breadItem = list.getItemByName('Bread');
			expect(breadItem).toBeTruthy();

			await list.removeItem(breadItem);
			expect(list.items).toHaveLength(2);
			expect(mockContext.client.post).toHaveBeenCalledTimes(5);
		});

		test('should complete recipe management workflow', async () => {
			// 1. Create a recipe
			const recipe = new Recipe({
				name: 'Integration Test Recipe',
				preparationSteps: ['Prep ingredients', 'Mix together', 'Cook'],
				ingredients: [
					{name: 'flour', quantity: '2 cups'},
					{name: 'eggs', quantity: '3'},
				],
				cookTime: 1200,
				rating: 4,
			}, mockContext);

			await recipe.save();
			expect(mockContext.client.post).toHaveBeenCalledTimes(1);

			// 2. Create a recipe collection
			const collection = new RecipeCollection({
				name: 'Test Collection',
			}, mockContext);

			await collection.save();
			expect(mockContext.client.post).toHaveBeenCalledTimes(2);

			// 3. Add recipe to collection
			await collection.addRecipe(recipe.identifier);
			expect(mockContext.client.post).toHaveBeenCalledTimes(3);

			// 4. Create meal planning event with recipe
			const event = new MealPlanningCalendarEvent({
				title: 'Cook Test Recipe',
				date: new Date('2024-01-20T18:00:00Z'),
				recipeId: recipe.identifier,
			}, mockContext);

			await event.save();
			expect(mockContext.client.post).toHaveBeenCalledTimes(4);
		});
	});

	describe('Error Handling Integration', () => {
		test('should handle API errors gracefully', async () => {
			mockContext.client.post.mockRejectedValue(new Error('API Error'));

			const item = new Item({name: 'Test Item'}, mockContext);

			await expect(item.save()).rejects.toThrow('API Error');
		});

		test('should validate item types in list operations', async () => {
			const list = new List({
				identifier: 'test-list',
				listId: 'test-list',
				name: 'Test List',
				items: [],
			}, mockContext);

			// Should reject non-Item objects
			await expect(list.addItem({})).rejects.toThrow(
				'Must be an instance of the Item class.',
			);

			await expect(list.addItem('not an item')).rejects.toThrow(
				'Must be an instance of the Item class.',
			);
		});

		test('should handle missing required fields', () => {
			// Item without required context should still create but may have issues
			expect(() => new Item({name: 'Test'}, {})).not.toThrow();

			// List without required context should still create
			expect(() => new List({name: 'Test List', items: []}, {})).not.toThrow();
		});
	});
});
