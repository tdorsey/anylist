const Item = require('../lib/item');

describe('Item Class', () => {
	test('should create an item with basic properties', () => {
		const mockItem = {
			listId: 'test-list-id',
			identifier: 'test-item-id',
			name: 'Test Item',
			details: 'Test details',
			quantity: '2',
			checked: false,
			manualSortIndex: 0,
			userId: 'test-user-id',
			categoryMatchId: 'test-category-id'
		};
		
		const mockContext = {
			// Mock context object that would typically contain API methods
			request: jest.fn()
		};

		const item = new Item(mockItem, mockContext);
		
		expect(item.listId).toBe('test-list-id');
		expect(item.identifier).toBe('test-item-id');
		expect(item.name).toBe('Test Item');
		expect(item.details).toBe('Test details');
		expect(item.quantity).toBe('2');
		expect(item.checked).toBe(false);
	});

	test('should handle missing properties gracefully', () => {
		const mockItem = {
			identifier: 'test-item-id',
			name: 'Test Item'
		};
		
		const mockContext = {
			request: jest.fn()
		};

		const item = new Item(mockItem, mockContext);
		
		expect(item.identifier).toBe('test-item-id');
		expect(item.name).toBe('Test Item');
		// Other properties should be undefined or have default values
	});
});