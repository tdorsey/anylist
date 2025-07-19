const FormData = require('form-data');
const Joi = require('joi');
const uuid = require('./uuid');

const OP_MAPPING = {
	name: 'set-list-item-name',
	quantity: 'set-list-item-quantity',
	details: 'set-list-item-details',
	checked: 'set-list-item-checked',
	categoryMatchId: 'set-list-item-category-match-id',
	manualSortIndex: 'set-list-item-sort-order',
};

// Pydantic-like schema for Item validation
const ItemSchema = Joi.object({
	listId: Joi.string().allow('').default(''),
	identifier: Joi.string().default(() => uuid()),
	name: Joi.string().required(),
	details: Joi.string().allow('').default(''),
	quantity: Joi.string().allow('').default(''),
	checked: Joi.boolean().default(false),
	manualSortIndex: Joi.number().allow(null),
	userId: Joi.string().allow('').default(''),
	categoryMatchId: Joi.string().default('other'),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * Item class.
 * @class
 *
 * @param {object} item item
 * @param {object} context context
 *
 * @property {string} listId
 * @property {string} identifier
 * @property {string} name
 * @property {string} details
 * @property {string} quantity
 * @property {string} checked
 * @property {string} manualSortIndex
 * @property {string} userId
 * @property {string} categoryMatchId
 */
class Item {
	/**
   * @hideconstructor
   */
	constructor(i, {client, protobuf, uid}) {
		// Preprocess input to handle null values like the original code
		const input = i || {};
		const preprocessedInput = {
			...input,
			details: input.details === null ? '' : input.details,
			quantity: input.quantity === null ? '' : input.quantity,
			listId: input.listId === null ? '' : input.listId,
			userId: input.userId === null ? '' : input.userId,
		};

		// Validate input using pydantic-like schema
		const {error, value} = ItemSchema.validate(preprocessedInput);

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`Item validation failed: ${errorMessage}`);
		}

		this._listId = value.listId;
		this._identifier = value.identifier;
		this._name = value.name;
		this._details = value.details;
		this._quantity = value.quantity;
		this._checked = value.checked;
		this._manualSortIndex = value.manualSortIndex;
		this._userId = value.userId;
		this._categoryMatchId = value.categoryMatchId;

		this._client = client;
		this._protobuf = protobuf;
		this._uid = uid;

		this._fieldsToUpdate = [];
	}

	toJSON() {
		return {
			listId: this._listId,
			identifier: this._identifier,
			name: this._name,
			details: this._details,
			quantity: this._quantity,
			checked: this._checked,
			manualSortIndex: this._manualSortIndex,
			userId: this._userId,
			categoryMatchId: this._categoryMatchId,
		};
	}

	_encode() {
		return new this._protobuf.ListItem({
			identifier: this._identifier,
			listId: this._listId,
			name: this._name,
			quantity: this._quantity,
			details: this._details,
			checked: this._checked,
			category: this._category,
			userId: this._userId,
			categoryMatchId: this._categoryMatchId,
			manualSortIndex: this._manualSortIndex,
		});
	}

	get identifier() {
		return this._identifier;
	}

	set identifier(_) {
		throw new Error('You cannot update an item ID.');
	}

	get listId() {
		return this._listId;
	}

	set listId(l) {
		if (this._listId === undefined) {
			this._listId = l;
			this._fieldsToUpdate.push('listId');
		} else {
			throw new Error('You cannot move items between lists.');
		}
	}

	get name() {
		return this._name;
	}

	set name(n) {
		const {error, value} = Joi.string().required().validate(n);
		if (error) {
			throw new Error(`Invalid name: ${error.message}`);
		}

		this._name = value;
		this._fieldsToUpdate.push('name');
	}

	get quantity() {
		return this._quantity;
	}

	set quantity(q) {
		let value = q;
		if (typeof q === 'number') {
			value = q.toString();
		}

		value = value === null ? '' : value;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid quantity: ${error.message}`);
		}

		this._quantity = validatedValue;
		this._fieldsToUpdate.push('quantity');
	}

	get details() {
		return this._details;
	}

	set details(d) {
		const value = d === null ? '' : d;
		const {error, value: validatedValue} = Joi.string().allow('').validate(value);
		if (error) {
			throw new Error(`Invalid details: ${error.message}`);
		}

		this._details = validatedValue;
		this._fieldsToUpdate.push('details');
	}

	get checked() {
		return this._checked;
	}

	set checked(c) {
		const {error, value} = Joi.boolean().required().validate(c);
		if (error) {
			throw new Error(`Invalid checked value: ${error.message}`);
		}

		this._checked = value;
		this._fieldsToUpdate.push('checked');
	}

	get userId() {
		return this._userId;
	}

	set userId(_) {
		throw new Error('Cannot set user ID of an item after creation.');
	}

	get categoryMatchId() {
		return this._categoryMatchId;
	}

	set categoryMatchId(i) {
		const {error, value} = Joi.string().default('other').validate(i);
		if (error) {
			throw new Error(`Invalid categoryMatchId: ${error.message}`);
		}

		this._categoryMatchId = value;
		this._fieldsToUpdate.push('categoryMatchId');
	}

	get manualSortIndex() {
		return this._manualSortIndex;
	}

	set manualSortIndex(i) {
		const {error, value} = Joi.number().allow(null).validate(i);
		if (error) {
			throw new Error(`Invalid manualSortIndex: ${error.message}`);
		}

		this._manualSortIndex = value;
		this._fieldsToUpdate.push('manualSortIndex');
	}

	/**
   * Save local changes to item to
   * AnyList's API.
   * Must set `isFavorite=true` if editing "favorites" list
   * @param {boolean} [isFavorite=false]
   * @return {Promise}
   */
	async save(isFavorite = false) {
		const ops = this._fieldsToUpdate.map(field => {
			const value = this[field];
			const opName = OP_MAPPING[field];

			const op = new this._protobuf.PBListOperation();

			op.setMetadata({
				operationId: uuid(),
				handlerId: opName,
				userId: this._uid,
			});

			op.setListId(this._listId);
			op.setListItemId(this._identifier);

			if (typeof value === 'boolean') {
				op.setUpdatedValue(value === true ? 'y' : 'n');
			} else {
				op.setUpdatedValue(value.toString());
			}

			return op;
		});

		const opList = new this._protobuf.PBListOperationList();

		opList.setOperations(ops);

		const form = new FormData();

		form.append('operations', opList.toBuffer());

		await this._client.post(isFavorite ? 'data/starter-lists/update' : 'data/shopping-lists/update', {
			body: form,
		});
	}
}

module.exports = Item;
