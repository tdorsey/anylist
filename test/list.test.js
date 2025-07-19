const {Buffer} = require('buffer');
const List = require('../lib/list');
const Item = require('../lib/item');

describe('List class', () => {
	let mockContext;
	let mockItems;

	beforeEach(() => {
		mockContext = {
			client: {
				post: jest.fn().mockResolvedValue({}),
			},
			protobuf: {
				// eslint-disable-next-line object-shorthand
				ListItem: function (data) {
					Object.assign(this, data);
					return this;
				},
				PBListOperation: jest.fn().mockImplementation(function () {
					this.setMetadata = jest.fn();
					this.setListId = jest.fn();
					this.setListItemId = jest.fn();
					this.setListItem = jest.fn();
					return this;
				}),
				PBListOperationList: jest.fn().mockImplementation(function () {
					this.setOperations = jest.fn();
					this.toBuffer = jest.fn().mockReturnValue(Buffer.from('test'));
					return this;
				}),
			},
			uid: 'test-user-id',
		};

		mockItems = [
			{
				identifier: 'item-1',
				name: 'Milk',
				checked: false,
			},
			{
				identifier: 'item-2',
				name: 'Bread',
				checked: true,
			},
		];
	});

	describe('constructor', () => {
		test('should create list with all properties', () => {
			const listData = {
				identifier: 'list-123',
				listId: 'parent-456',
				name: 'Grocery List',
				items: mockItems,
			};

			const list = new List(listData, mockContext);

			expect(list.identifier).toBe('list-123');
			expect(list.parentId).toBe('parent-456');
			expect(list.name).toBe('Grocery List');
			expect(list.items).toHaveLength(2);
			expect(list.items[0]).toBeInstanceOf(Item);
			expect(list.items[0].name).toBe('Milk');
			expect(list.items[1].name).toBe('Bread');
		});

		test('should create list with empty items array', () => {
			const listData = {
				identifier: 'list-123',
				listId: 'parent-456',
				name: 'Empty List',
				items: [],
			};

			const list = new List(listData, mockContext);

			expect(list.items).toHaveLength(0);
		});
	});

	describe('addItem method', () => {
		let list;
		let newItem;

		beforeEach(() => {
			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: [],
			};
			list = new List(listData, mockContext);

			newItem = new Item({name: 'New Item'}, mockContext);
		});

		test('should add item to shopping list by default', async () => {
			await list.addItem(newItem);

			expect(list.items).toContain(newItem);
			expect(newItem.listId).toBe('list-123');
			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/shopping-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should add item to favorites list when isFavorite=true', async () => {
			await list.addItem(newItem, true);

			expect(list.items).toContain(newItem);
			expect(newItem.listId).toBe('list-123');
			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/starter-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should throw error if item is not an Item instance', async () => {
			const notAnItem = {name: 'Not an item'};

			await expect(list.addItem(notAnItem)).rejects.toThrow(
				'Must be an instance of the Item class.',
			);
		});

		test('should create proper protobuf operations', async () => {
			await list.addItem(newItem);

			expect(mockContext.protobuf.PBListOperation).toHaveBeenCalled();
			expect(mockContext.protobuf.PBListOperationList).toHaveBeenCalled();
		});
	});

	describe('removeItem method', () => {
		let list;
		let existingItem;

		beforeEach(() => {
			existingItem = new Item({
				identifier: 'item-1',
				name: 'Existing Item',
			}, mockContext);

			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: [existingItem],
			};
			list = new List(listData, mockContext);
		});

		test('should remove item from shopping list by default', async () => {
			await list.removeItem(existingItem);

			expect(list.items).not.toContain(existingItem);
			expect(list.items).toHaveLength(0);
			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/shopping-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should remove item from favorites list when isFavorite=true', async () => {
			await list.removeItem(existingItem, true);

			expect(list.items).not.toContain(existingItem);
			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/starter-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should create proper protobuf operations', async () => {
			await list.removeItem(existingItem);

			expect(mockContext.protobuf.PBListOperation).toHaveBeenCalled();
			expect(mockContext.protobuf.PBListOperationList).toHaveBeenCalled();
		});
	});

	describe('uncheckAll method', () => {
		let list;

		beforeEach(() => {
			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: mockItems,
			};
			list = new List(listData, mockContext);
		});

		test('should send uncheck-all operation', async () => {
			await list.uncheckAll();

			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/shopping-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);

			expect(mockContext.protobuf.PBListOperation).toHaveBeenCalled();
		});
	});

	describe('getItemById method', () => {
		let list;

		beforeEach(() => {
			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: mockItems,
			};
			list = new List(listData, mockContext);
		});

		test('should find item by identifier', () => {
			const foundItem = list.getItemById('item-1');
			expect(foundItem).toBeDefined();
			expect(foundItem.name).toBe('Milk');
		});

		test('should return undefined for non-existent identifier', () => {
			const foundItem = list.getItemById('non-existent');
			expect(foundItem).toBeUndefined();
		});
	});

	describe('getItemByName method', () => {
		let list;

		beforeEach(() => {
			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: mockItems,
			};
			list = new List(listData, mockContext);
		});

		test('should find item by name', () => {
			const foundItem = list.getItemByName('Milk');
			expect(foundItem).toBeDefined();
			expect(foundItem.identifier).toBe('item-1');
		});

		test('should return undefined for non-existent name', () => {
			const foundItem = list.getItemByName('Non-existent Item');
			expect(foundItem).toBeUndefined();
		});

		test('should be case-sensitive', () => {
			const foundItem = list.getItemByName('milk'); // Lowercase
			expect(foundItem).toBeUndefined();
		});
	});

	describe('context handling', () => {
		test('should store context properties correctly', () => {
			const listData = {
				identifier: 'list-123',
				name: 'Test List',
				items: [],
			};
			const list = new List(listData, mockContext);

			expect(list.client).toBe(mockContext.client);
			expect(list.protobuf).toBe(mockContext.protobuf);
			expect(list.uid).toBe(mockContext.uid);
		});
	});
});
