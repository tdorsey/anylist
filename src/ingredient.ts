import {type AnyListContext} from './types';

export type IngredientData = {
	rawIngredient?: string;
	name?: string;
	quantity?: string;
	note?: string;
};

/**
 * Ingredient class for recipe ingredients.
 */
export class Ingredient {
	private _rawIngredient?: string;
	private _name?: string;
	private _quantity?: string;
	private _note?: string;
	private readonly _client: any;
	private readonly _protobuf: any;
	private readonly _uid?: string;
	private readonly _fieldsToUpdate: string[] = [];

	constructor(ingredient: IngredientData, context: AnyListContext) {
		this._rawIngredient = ingredient.rawIngredient;
		this._name = ingredient.name;
		this._quantity = ingredient.quantity;
		this._note = ingredient.note;
		this._client = context.client;
		this._protobuf = context.protobuf;
		this._uid = context.uid;
	}

	toJSON(): IngredientData {
		return {
			rawIngredient: this._rawIngredient,
			name: this._name,
			quantity: this._quantity,
			note: this._note,
		};
	}

	_encode(): any {
		return new this._protobuf.PBIngredient({
			name: this._name,
			quantity: this._quantity,
			rawIngredient: this._rawIngredient,
			note: this._note,
		});
	}

	get rawIngredient(): string | undefined {
		return this._rawIngredient;
	}

	set rawIngredient(n: string | undefined) {
		this._rawIngredient = n;
		this._fieldsToUpdate.push('rawIngredient');
	}

	get name(): string | undefined {
		return this._name;
	}

	set name(n: string | undefined) {
		this._name = n;
		this._fieldsToUpdate.push('name');
	}

	get quantity(): string | undefined {
		return this._quantity;
	}

	set quantity(q: string | undefined) {
		this._quantity = q;
		this._fieldsToUpdate.push('quantity');
	}

	get note(): string | undefined {
		return this._note;
	}

	set note(n: string | undefined) {
		this._note = n;
		this._fieldsToUpdate.push('note');
	}
}

export default Ingredient;
