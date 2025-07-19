const AnyList = require('../lib/index');

describe('AnyList Integration Tests', () => {
	// These are basic integration tests that test the module structure
	// without actually making API calls (which would require credentials)
	
	test('should export AnyList class', () => {
		expect(typeof AnyList).toBe('function');
		expect(AnyList.name).toBe('AnyList');
	});

	test('should be able to instantiate AnyList with required parameters', () => {
		const options = {
			email: 'test@example.com',
			password: 'testpassword'
		};

		// This should not throw an error
		expect(() => {
			new AnyList(options);
		}).not.toThrow();
	});

	test('should extend EventEmitter', () => {
		const options = {
			email: 'test@example.com',
			password: 'testpassword'
		};

		const anylist = new AnyList(options);
		
		// Should have EventEmitter methods
		expect(typeof anylist.on).toBe('function');
		expect(typeof anylist.emit).toBe('function');
		expect(typeof anylist.removeListener).toBe('function');
	});

	test('should set initial properties correctly', () => {
		const options = {
			email: 'test@example.com',
			password: 'testpassword',
			credentialsFile: '/tmp/test-credentials'
		};

		const anylist = new AnyList(options);
		
		expect(anylist.email).toBe('test@example.com');
		expect(anylist.password).toBe('testpassword');
		expect(anylist.credentialsFile).toBe('/tmp/test-credentials');
	});

	test('should use default credentials file path when not provided', () => {
		const options = {
			email: 'test@example.com',
			password: 'testpassword'
		};

		const anylist = new AnyList(options);
		
		// Should have a default path containing .anylist_credentials
		expect(anylist.credentialsFile).toContain('.anylist_credentials');
	});
});