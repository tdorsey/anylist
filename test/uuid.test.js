const uuid = require('../lib/uuid');

describe('UUID utility', () => {
	test('should generate a string', () => {
		const id = uuid();
		expect(typeof id).toBe('string');
	});

	test('should generate a non-empty string', () => {
		const id = uuid();
		expect(id.length).toBeGreaterThan(0);
	});

	test('should generate strings without hyphens', () => {
		const id = uuid();
		expect(id).not.toContain('-');
	});

	test('should generate a 32-character string (UUID v4 without hyphens)', () => {
		const id = uuid();
		expect(id).toHaveLength(32);
	});

	test('should generate different IDs on subsequent calls', () => {
		const id1 = uuid();
		const id2 = uuid();
		expect(id1).not.toBe(id2);
	});

	test('should generate strings containing only hexadecimal characters', () => {
		const id = uuid();
		expect(id).toMatch(/^[\da-f]{32}$/);
	});

	test('should generate multiple unique IDs', () => {
		const ids = new Set();
		for (let i = 0; i < 100; i++) {
			ids.add(uuid());
		}

		// All 100 IDs should be unique
		expect(ids.size).toBe(100);
	});
});
