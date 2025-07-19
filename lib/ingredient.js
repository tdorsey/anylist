const Joi = require('joi');

// Pydantic-like schema for Ingredient validation
const IngredientSchema = Joi.object({
	rawIngredient: Joi.string().allow('').default(''),
	name: Joi.string().allow('').default(''),
	quantity: Joi.string().allow('').default(''),
	note: Joi.string().allow('').default(''),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * Ingredient class (in progress).
 * @class
 *
 * @param {object} ingredient ingredient
 * @param {object} context context
 *
 * @property {string} rawIngredient
 * @property {string} name
 * @property {string} quantity
 * @property {string} note
 */
class Ingredient {
	/**
   * @hideconstructor
   */
	constructor(i, {client, protobuf, uid}) {
		// Preprocess input to handle null values like the original code
		const input = i || {};
		const preprocessedInput = {
			...input,
			rawIngredient: input.rawIngredient === null ? '' : input.rawIngredient,
			name: input.name === null ? '' : input.name,
			quantity: input.quantity === null ? '' : input.quantity,
			note: input.note === null ? '' : input.note,
		};

		// Validate input using pydantic-like schema
		const {error, value} = IngredientSchema.validate(preprocessedInput);

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`Ingredient validation failed: ${errorMessage}`);
		}

		this._rawIngredient = value.rawIngredient;
		this._name = value.name;
		this._quantity = value.quantity;
		this._note = value.note;
		this._client = client;
		this._protobuf = protobuf;
		this._uid = uid;

		this._fieldsToUpdate = [];
	}

	toJSON() {
		return {
			rawIngredient: this._rawIngredient,
			name: this._name,
			quantity: this._quantity,
			note: this._note,
		};
	}

	_encode() {
		return new this._protobuf.PBIngredient({
			name: this._name,
			quantity: this._quantity,
			rawIngredient: this._rawIngredient,
			note: this._note,
		});
	}

	get rawIngredient() {
		return this._rawIngredient;
	}

	set rawIngredient(n) {
		const value = n === null ? '' : n;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid rawIngredient: ${error.message}`);
		}

		this._rawIngredient = validatedValue;
		this._fieldsToUpdate.push('rawIngredient');
	}

	get name() {
		return this._name;
	}

	set name(n) {
		const value = n === null ? '' : n;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid name: ${error.message}`);
		}

		this._name = validatedValue;
		this._fieldsToUpdate.push('name');
	}

	get quantity() {
		return this._quantity;
	}

	set quantity(q) {
		const value = q === null ? '' : q;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid quantity: ${error.message}`);
		}

		this._quantity = validatedValue;
		this._fieldsToUpdate.push('quantity');
	}

	get note() {
		return this._note;
	}

	set note(n) {
		const value = n === null ? '' : n;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid note: ${error.message}`);
		}

		this._note = validatedValue;
		this._fieldsToUpdate.push('note');
	}
}

module.exports = Ingredient;
