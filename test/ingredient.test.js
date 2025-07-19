const Ingredient = require('../lib/ingredient');

describe('Ingredient class', () => {
	let mockContext;

	beforeEach(() => {
		mockContext = {
			client: {},
			protobuf: {
				// eslint-disable-next-line object-shorthand
				PBIngredient: function (data) {
					this.name = data.name;
					this.quantity = data.quantity;
					this.rawIngredient = data.rawIngredient;
					this.note = data.note;
				},
			},
			uid: 'test-user-id',
		};
	});

	describe('constructor', () => {
		test('should create ingredient with all properties', () => {
			const ingredientData = {
				rawIngredient: '2 cups flour',
				name: 'flour',
				quantity: '2 cups',
				note: 'all-purpose',
			};

			const ingredient = new Ingredient(ingredientData, mockContext);

			expect(ingredient.rawIngredient).toBe('2 cups flour');
			expect(ingredient.name).toBe('flour');
			expect(ingredient.quantity).toBe('2 cups');
			expect(ingredient.note).toBe('all-purpose');
		});

		test('should create ingredient with minimal properties', () => {
			const ingredientData = {
				name: 'salt',
			};

			const ingredient = new Ingredient(ingredientData, mockContext);

			expect(ingredient.name).toBe('salt');
			expect(ingredient.rawIngredient).toBeUndefined();
			expect(ingredient.quantity).toBeUndefined();
			expect(ingredient.note).toBeUndefined();
		});
	});

	describe('property setters', () => {
		let ingredient;

		beforeEach(() => {
			ingredient = new Ingredient({}, mockContext);
		});

		test('should set rawIngredient and track changes', () => {
			ingredient.rawIngredient = '1 tbsp sugar';
			expect(ingredient.rawIngredient).toBe('1 tbsp sugar');
			expect(ingredient._fieldsToUpdate).toContain('rawIngredient');
		});

		test('should set name and track changes', () => {
			ingredient.name = 'sugar';
			expect(ingredient.name).toBe('sugar');
			expect(ingredient._fieldsToUpdate).toContain('name');
		});

		test('should set quantity and track changes', () => {
			ingredient.quantity = '1 tbsp';
			expect(ingredient.quantity).toBe('1 tbsp');
			expect(ingredient._fieldsToUpdate).toContain('quantity');
		});

		test('should set note and track changes', () => {
			ingredient.note = 'granulated';
			expect(ingredient.note).toBe('granulated');
			expect(ingredient._fieldsToUpdate).toContain('note');
		});
	});

	describe('toJSON method', () => {
		test('should return proper JSON representation', () => {
			const ingredientData = {
				rawIngredient: '2 cups flour',
				name: 'flour',
				quantity: '2 cups',
				note: 'all-purpose',
			};

			const ingredient = new Ingredient(ingredientData, mockContext);
			const json = ingredient.toJSON();

			expect(json).toEqual({
				rawIngredient: '2 cups flour',
				name: 'flour',
				quantity: '2 cups',
				note: 'all-purpose',
			});
		});

		test('should handle undefined values in JSON', () => {
			const ingredient = new Ingredient({name: 'salt'}, mockContext);
			const json = ingredient.toJSON();

			expect(json).toEqual({
				rawIngredient: undefined,
				name: 'salt',
				quantity: undefined,
				note: undefined,
			});
		});
	});

	describe('_encode method', () => {
		test('should encode ingredient properly', () => {
			const ingredientData = {
				rawIngredient: '2 cups flour',
				name: 'flour',
				quantity: '2 cups',
				note: 'all-purpose',
			};

			const ingredient = new Ingredient(ingredientData, mockContext);
			const encoded = ingredient._encode();

			expect(encoded.name).toBe('flour');
			expect(encoded.quantity).toBe('2 cups');
			expect(encoded.rawIngredient).toBe('2 cups flour');
			expect(encoded.note).toBe('all-purpose');
		});
	});

	describe('field tracking', () => {
		test('should track multiple field updates', () => {
			const ingredient = new Ingredient({}, mockContext);

			ingredient.name = 'butter';
			ingredient.quantity = '1/2 cup';
			ingredient.note = 'softened';

			expect(ingredient._fieldsToUpdate).toContain('name');
			expect(ingredient._fieldsToUpdate).toContain('quantity');
			expect(ingredient._fieldsToUpdate).toContain('note');
			expect(ingredient._fieldsToUpdate).toHaveLength(3);
		});

		test('should track same field multiple times if set multiple times', () => {
			const ingredient = new Ingredient({}, mockContext);

			ingredient.name = 'butter';
			ingredient.name = 'margarine';

			expect(ingredient._fieldsToUpdate).toEqual(['name', 'name']);
		});
	});
});
