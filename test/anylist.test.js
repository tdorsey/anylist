const AnyList = require('../lib/index');
const List = require('../lib/list');
const Item = require('../lib/item');
const Recipe = require('../lib/recipe');
const RecipeCollection = require('../lib/recipe-collection');
const MealPlanningCalendarEvent = require('../lib/meal-planning-calendar-event');

describe('AnyList class', () => {
	let anylist;

	beforeEach(() => {
		anylist = new AnyList({
			email: 'test@example.com',
			password: 'testpassword',
		});
	});

	describe('constructor', () => {
		test('should create instance with required properties', () => {
			expect(anylist.email).toBe('test@example.com');
			expect(anylist.password).toBe('testpassword');
			expect(anylist.lists).toEqual([]);
			expect(anylist.favoriteItems).toEqual([]);
			expect(anylist.recentItems).toEqual({});
			expect(anylist.recipes).toEqual([]);
		});

		test('should use default credentials file path', () => {
			const os = require('os');
			const path = require('path');
			expect(anylist.credentialsFile).toBe(path.join(os.homedir(), '.anylist_credentials'));
		});

		test('should accept custom credentials file path', () => {
			const customPath = '/custom/path/credentials';
			const customAnylist = new AnyList({
				email: 'test@example.com',
				password: 'testpassword',
				credentialsFile: customPath,
			});
			expect(customAnylist.credentialsFile).toBe(customPath);
		});

		test('should accept null credentials file to disable storage', () => {
			const customAnylist = new AnyList({
				email: 'test@example.com',
				password: 'testpassword',
				credentialsFile: null,
			});
			expect(customAnylist.credentialsFile).toBeNull();
		});
	});

	describe('factory methods', () => {
		beforeEach(() => {
			// Mock the internal properties needed for factory methods
			anylist.client = {};
			anylist.protobuf = {};
			anylist.uid = 'test-user-id';
			anylist.recipeDataId = 'test-recipe-data-id';
			anylist.calendarId = 'test-calendar-id';
		});

		describe('createItem', () => {
			test('should create Item instance with proper context', () => {
				const itemData = {
					name: 'Test Item',
					quantity: '1',
				};

				const item = anylist.createItem(itemData);

				expect(item).toBeInstanceOf(Item);
				expect(item.name).toBe('Test Item');
				expect(item.quantity).toBe('1');
			});

			test('should create Item with minimal data', () => {
				const item = anylist.createItem({});

				expect(item).toBeInstanceOf(Item);
			});
		});

		describe('createRecipe', () => {
			test('should create Recipe instance with proper context', async () => {
				const recipeData = {
					name: 'Test Recipe',
					ingredients: [],
				};

				const recipe = await anylist.createRecipe(recipeData);

				expect(recipe).toBeInstanceOf(Recipe);
				expect(recipe.name).toBe('Test Recipe');
			});

			test('should handle missing recipeDataId by setting it', async () => {
				anylist.recipeDataId = null;
				anylist.getRecipes = jest.fn().mockResolvedValue([]);

				const recipe = await anylist.createRecipe({name: 'Test'});

				expect(anylist.getRecipes).toHaveBeenCalled();
				expect(recipe).toBeInstanceOf(Recipe);
			});
		});

		describe('createRecipeCollection', () => {
			test('should create RecipeCollection instance', () => {
				// Add required protobuf mock for RecipeCollection
				anylist.protobuf.PBRecipeCollectionSettings = function () {
					return this;
				};

				const collectionData = {
					name: 'Test Collection',
				};

				const collection = anylist.createRecipeCollection(collectionData);

				expect(collection).toBeInstanceOf(RecipeCollection);
				expect(collection.name).toBe('Test Collection');
			});
		});

		describe('createEvent', () => {
			test('should create MealPlanningCalendarEvent instance', async () => {
				const eventData = {
					title: 'Test Event',
				};

				const event = await anylist.createEvent(eventData);

				expect(event).toBeInstanceOf(MealPlanningCalendarEvent);
				expect(event.title).toBe('Test Event');
			});

			test('should handle missing calendarId by getting user data', async () => {
				anylist.calendarId = null;
				anylist._getUserData = jest.fn().mockResolvedValue({});

				const event = await anylist.createEvent({title: 'Test'});

				expect(anylist._getUserData).toHaveBeenCalled();
				expect(event).toBeInstanceOf(MealPlanningCalendarEvent);
			});
		});
	});

	describe('list management', () => {
		beforeEach(() => {
			// Mock lists data
			anylist.lists = [
				new List({
					identifier: 'list-1',
					name: 'Grocery List',
					items: [],
				}, {client: {}, protobuf: {ListItem(data) {
					return data;
				}}, uid: 'test-user'}),
				new List({
					identifier: 'list-2',
					name: 'Hardware Store',
					items: [],
				}, {client: {}, protobuf: {ListItem(data) {
					return data;
				}}, uid: 'test-user'}),
			];
		});

		describe('getListById', () => {
			test('should find list by identifier', () => {
				const list = anylist.getListById('list-1');
				expect(list).toBeDefined();
				expect(list.name).toBe('Grocery List');
			});

			test('should return undefined for non-existent identifier', () => {
				const list = anylist.getListById('non-existent');
				expect(list).toBeUndefined();
			});
		});

		describe('getListByName', () => {
			test('should find list by name', () => {
				const list = anylist.getListByName('Hardware Store');
				expect(list).toBeDefined();
				expect(list.identifier).toBe('list-2');
			});

			test('should return undefined for non-existent name', () => {
				const list = anylist.getListByName('Non-existent List');
				expect(list).toBeUndefined();
			});

			test('should be case-sensitive', () => {
				const list = anylist.getListByName('grocery list'); // Lowercase
				expect(list).toBeUndefined();
			});
		});
	});

	describe('favorite items management', () => {
		beforeEach(() => {
			anylist.favoriteItems = [
				new List({
					identifier: 'fav-1',
					listId: 'list-1', // This maps to parentId in the constructor
					name: 'Favorites for Grocery',
					items: [],
				}, {client: {}, protobuf: {ListItem(data) {
					return data;
				}}, uid: 'test-user'}),
				new List({
					identifier: 'fav-2',
					listId: 'list-2', // This maps to parentId in the constructor
					name: 'Favorites for Hardware',
					items: [],
				}, {client: {}, protobuf: {ListItem(data) {
					return data;
				}}, uid: 'test-user'}),
			];
		});

		describe('getFavoriteItemsByListId', () => {
			test('should find favorite items by parent list identifier', () => {
				const favorites = anylist.getFavoriteItemsByListId('list-1');
				expect(favorites).toBeDefined();
				expect(favorites.name).toBe('Favorites for Grocery');
			});

			test('should return undefined for non-existent parent identifier', () => {
				const favorites = anylist.getFavoriteItemsByListId('non-existent');
				expect(favorites).toBeUndefined();
			});
		});
	});

	describe('recent items management', () => {
		beforeEach(() => {
			anylist.recentItems = {
				'list-1': [
					new Item({identifier: 'recent-1', name: 'Recent Item 1'}, {client: {}, protobuf: {ListItem(data) {
						return data;
					}}, uid: 'test'}),
					new Item({identifier: 'recent-2', name: 'Recent Item 2'}, {client: {}, protobuf: {ListItem(data) {
						return data;
					}}, uid: 'test'}),
				],
				'list-2': [
					new Item({identifier: 'recent-3', name: 'Recent Item 3'}, {client: {}, protobuf: {ListItem(data) {
						return data;
					}}, uid: 'test'}),
				],
			};
		});

		describe('getRecentItemsByListId', () => {
			test('should return recent items for existing list', () => {
				const recent = anylist.getRecentItemsByListId('list-1');
				expect(recent).toHaveLength(2);
				expect(recent[0].name).toBe('Recent Item 1');
				expect(recent[1].name).toBe('Recent Item 2');
			});

			test('should return undefined for non-existent list', () => {
				const recent = anylist.getRecentItemsByListId('non-existent');
				expect(recent).toBeUndefined();
			});
		});
	});

	describe('credentials encryption/decryption', () => {
		test('should encrypt and decrypt credentials correctly', () => {
			const credentials = {
				clientId: 'test-client-id',
				accessToken: 'test-access-token',
				refreshToken: 'test-refresh-token',
			};
			const secret = 'test-secret';

			const encrypted = anylist._encryptCredentials(credentials, secret);
			expect(typeof encrypted).toBe('string');

			const decrypted = anylist._decryptCredentials(encrypted, secret);
			expect(decrypted).toEqual(credentials);
		});

		test('should produce different encrypted output for same input (due to random IV)', () => {
			const credentials = {clientId: 'test-id'};
			const secret = 'test-secret';

			const encrypted1 = anylist._encryptCredentials(credentials, secret);
			const encrypted2 = anylist._encryptCredentials(credentials, secret);

			expect(encrypted1).not.toBe(encrypted2);

			// But both should decrypt to the same value
			const decrypted1 = anylist._decryptCredentials(encrypted1, secret);
			const decrypted2 = anylist._decryptCredentials(encrypted2, secret);
			expect(decrypted1).toEqual(decrypted2);
		});
	});

	describe('teardown', () => {
		test('should clear heartbeat interval and close websocket if present', () => {
			// Mock websocket and heartbeat
			anylist._heartbeatPing = setInterval(() => {}, 1000);
			anylist.ws = {
				close: jest.fn(),
			};

			anylist.teardown();

			expect(anylist.ws.close).toHaveBeenCalled();
			// The interval should be cleared (hard to test directly)
		});

		test('should handle teardown without websocket', () => {
			anylist._heartbeatPing = setInterval(() => {}, 1000);
			anylist.ws = undefined;

			// Should not throw
			expect(() => anylist.teardown()).not.toThrow();
		});
	});
});
