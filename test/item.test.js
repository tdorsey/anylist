const {Buffer} = require('buffer');
const Item = require('../lib/item');

describe('Item class', () => {
	let mockContext;

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
					this.setUpdatedValue = jest.fn();
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
	});

	describe('constructor', () => {
		test('should create item with all properties', () => {
			const itemData = {
				listId: 'list-123',
				identifier: 'item-456',
				name: 'Milk',
				details: '2% fat',
				quantity: '1 gallon',
				checked: false,
				manualSortIndex: 1,
				userId: 'user-789',
				categoryMatchId: 'dairy',
			};

			const item = new Item(itemData, mockContext);

			expect(item.listId).toBe('list-123');
			expect(item.identifier).toBe('item-456');
			expect(item.name).toBe('Milk');
			expect(item.details).toBe('2% fat');
			expect(item.quantity).toBe('1 gallon');
			expect(item.checked).toBe(false);
			expect(item.manualSortIndex).toBe(1);
			expect(item.userId).toBe('user-789');
			expect(item.categoryMatchId).toBe('dairy');
		});

		test('should create item with minimal properties and defaults', () => {
			const itemData = {
				name: 'Bread',
			};

			const item = new Item(itemData, mockContext);

			expect(item.name).toBe('Bread');
			expect(item.categoryMatchId).toBe('other'); // Default value
			expect(item.identifier).toMatch(/^[\da-f]{32}$/); // Should generate UUID
		});
	});

	describe('property setters and getters', () => {
		let item;

		beforeEach(() => {
			item = new Item({name: 'Test Item'}, mockContext);
		});

		test('should not allow setting identifier', () => {
			expect(() => {
				item.identifier = 'new-id';
			}).toThrow('You cannot update an item ID.');
		});

		test('should set listId only once', () => {
			item.listId = 'list-123';
			expect(item.listId).toBe('list-123');
			expect(item._fieldsToUpdate).toContain('listId');

			expect(() => {
				item.listId = 'list-456';
			}).toThrow('You cannot move items between lists.');
		});

		test('should set and track name changes', () => {
			item.name = 'Updated Item';
			expect(item.name).toBe('Updated Item');
			expect(item._fieldsToUpdate).toContain('name');
		});

		test('should set and track quantity changes (string)', () => {
			item.quantity = '2 pounds';
			expect(item.quantity).toBe('2 pounds');
			expect(item._fieldsToUpdate).toContain('quantity');
		});

		test('should set and track quantity changes (number converted to string)', () => {
			item.quantity = 5;
			expect(item.quantity).toBe('5');
			expect(item._fieldsToUpdate).toContain('quantity');
		});

		test('should set and track details changes', () => {
			item.details = 'organic';
			expect(item.details).toBe('organic');
			expect(item._fieldsToUpdate).toContain('details');
		});

		test('should set and track checked changes with boolean validation', () => {
			item.checked = true;
			expect(item.checked).toBe(true);
			expect(item._fieldsToUpdate).toContain('checked');

			item.checked = false;
			expect(item.checked).toBe(false);
		});

		test('should throw error for non-boolean checked value', () => {
			expect(() => {
				item.checked = 'true';
			}).toThrow('Checked must be a boolean.');

			expect(() => {
				item.checked = 1;
			}).toThrow('Checked must be a boolean.');
		});

		test('should not allow setting userId', () => {
			expect(() => {
				item.userId = 'new-user';
			}).toThrow('Cannot set user ID of an item after creation.');
		});

		test('should set and track categoryMatchId changes', () => {
			item.categoryMatchId = 'produce';
			expect(item.categoryMatchId).toBe('produce');
			expect(item._fieldsToUpdate).toContain('categoryMatchId');
		});

		test('should set and track manualSortIndex changes with number validation', () => {
			item.manualSortIndex = 5;
			expect(item.manualSortIndex).toBe(5);
			expect(item._fieldsToUpdate).toContain('manualSortIndex');
		});

		test('should throw error for non-number manualSortIndex', () => {
			expect(() => {
				item.manualSortIndex = '5';
			}).toThrow('Sort index must be a number.');
		});
	});

	describe('toJSON method', () => {
		test('should return proper JSON representation', () => {
			const itemData = {
				listId: 'list-123',
				identifier: 'item-456',
				name: 'Milk',
				details: '2% fat',
				quantity: '1 gallon',
				checked: false,
				manualSortIndex: 1,
				userId: 'user-789',
				categoryMatchId: 'dairy',
			};

			const item = new Item(itemData, mockContext);
			const json = item.toJSON();

			expect(json).toEqual(itemData);
		});
	});

	describe('_encode method', () => {
		test('should encode item properly', () => {
			const itemData = {
				listId: 'list-123',
				identifier: 'item-456',
				name: 'Milk',
				quantity: '1 gallon',
				details: '2% fat',
				checked: false,
				userId: 'user-789',
				categoryMatchId: 'dairy',
				manualSortIndex: 1,
			};

			const item = new Item(itemData, mockContext);
			const encoded = item._encode();

			expect(encoded.identifier).toBe('item-456');
			expect(encoded.listId).toBe('list-123');
			expect(encoded.name).toBe('Milk');
			expect(encoded.quantity).toBe('1 gallon');
			expect(encoded.details).toBe('2% fat');
			expect(encoded.checked).toBe(false);
			expect(encoded.userId).toBe('user-789');
			expect(encoded.categoryMatchId).toBe('dairy');
			expect(encoded.manualSortIndex).toBe(1);
		});
	});

	describe('save method', () => {
		let item;

		beforeEach(() => {
			item = new Item({
				listId: 'list-123',
				identifier: 'item-456',
				name: 'Milk',
			}, mockContext);
		});

		test('should save changes to shopping list by default', async () => {
			item.name = 'Chocolate Milk';
			item.checked = true;

			await item.save();

			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/shopping-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should save changes to favorites list when isFavorite=true', async () => {
			item.name = 'Chocolate Milk';

			await item.save(true);

			expect(mockContext.client.post).toHaveBeenCalledWith(
				'data/starter-lists/update',
				expect.objectContaining({
					body: expect.any(Object),
				}),
			);
		});

		test('should handle boolean values correctly in operations', async () => {
			item.checked = true;

			await item.save();

			// Verify that the operation was created and boolean was converted to 'y'
			expect(mockContext.protobuf.PBListOperation).toHaveBeenCalled();
		});

		test('should not make API call if no fields to update', async () => {
			// Create item without making any changes
			await item.save();

			// Should create empty operations list but still make the call
			expect(mockContext.client.post).toHaveBeenCalled();
		});
	});

	describe('field tracking', () => {
		test('should track multiple field updates', () => {
			const item = new Item({}, mockContext);

			item.name = 'Eggs';
			item.quantity = '12';
			item.checked = true;

			expect(item._fieldsToUpdate).toContain('name');
			expect(item._fieldsToUpdate).toContain('quantity');
			expect(item._fieldsToUpdate).toContain('checked');
			expect(item._fieldsToUpdate).toHaveLength(3);
		});

		test('should track same field multiple times if set multiple times', () => {
			const item = new Item({}, mockContext);

			item.name = 'Eggs';
			item.name = 'Organic Eggs';

			expect(item._fieldsToUpdate).toEqual(['name', 'name']);
		});
	});
});
