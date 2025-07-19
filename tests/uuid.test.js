const uuid = require('../lib/uuid');

describe('UUID Generator', () => {
	test('should generate a UUID without dashes', () => {
		const id = uuid();
		
		// Should be a string
		expect(typeof id).toBe('string');
		
		// Should be 32 characters (UUID v4 without dashes)
		expect(id).toHaveLength(32);
		
		// Should not contain dashes
		expect(id).not.toContain('-');
		
		// Should be alphanumeric
		expect(id).toMatch(/^[a-f0-9]+$/);
	});

	test('should generate unique UUIDs', () => {
		const id1 = uuid();
		const id2 = uuid();
		
		expect(id1).not.toBe(id2);
	});

	test('should generate multiple unique UUIDs', () => {
		const ids = new Set();
		
		// Generate 100 UUIDs and ensure they're all unique
		for (let i = 0; i < 100; i++) {
			ids.add(uuid());
		}
		
		expect(ids.size).toBe(100);
	});
});