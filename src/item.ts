import FormData from 'form-data';
import uuid from '../lib/uuid';
import type {AnyListContext} from '../lib/types.d';
import type {ItemData} from './item.d';

const OP_MAPPING: Record<string, string> = {
	name: 'set-list-item-name',
	quantity: 'set-list-item-quantity',
	details: 'set-list-item-details',
	checked: 'set-list-item-checked',
	categoryMatchId: 'set-list-item-category-match-id',
	manualSortIndex: 'set-list-item-sort-order',
};

/**
 * Represents an individual item in a shopping list with methods for modification.
 * 
 * @example
 * ```typescript
 * // Create a new item
 * const item = new Item({
 *   name: 'Bananas',
 *   quantity: '6',
 *   details: 'Ripe, for smoothies'
 * }, context);
 * 
 * // Mark item as purchased
 * item.checked = true;
 * await item.save();
 * 
 * // Update item properties
 * item.quantity = '12';
 * item.details = 'Extra for baking';
 * await item.save();
 * ```
 * 
 * @see {@link List} List class for managing collections of items
 */
export class Item {
	private _listId?: string;
	private readonly _identifier: string;
	private _name?: string;
	private _details?: string;
	private _quantity?: string;
	private _checked?: boolean;
	private _manualSortIndex?: number;
	private readonly _userId?: string;
	private _categoryMatchId?: string;
	private readonly _client: any;
	private readonly _protobuf: any;
	private readonly _uid?: string;
	private readonly _fieldsToUpdate: string[] = [];

	constructor(item: ItemData, context: AnyListContext) {
		this._listId = item.listId;
		this._identifier = item.identifier || uuid();
		this._name = item.name;
		this._details = item.details;
		this._quantity = item.quantity;
		this._checked = item.checked;
		this._manualSortIndex = item.manualSortIndex;
		this._userId = item.userId;
		this._categoryMatchId = item.categoryMatchId || 'other';

		this._client = context.client;
		this._protobuf = context.protobuf;
		this._uid = context.uid;
	}

	toJSON(): ItemData {
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

	_encode(): any {
		return new this._protobuf.ListItem({
			identifier: this._identifier,
			listId: this._listId,
			name: this._name,
			quantity: this._quantity,
			details: this._details,
			checked: this._checked,
			userId: this._userId,
			categoryMatchId: this._categoryMatchId,
			manualSortIndex: this._manualSortIndex,
		});
	}

	get identifier(): string {
		return this._identifier;
	}

	set identifier(_: string) {
		throw new Error('You cannot update an item ID.');
	}

	get listId(): string | undefined {
		return this._listId;
	}

	set listId(l: string | undefined) {
		if (this._listId === undefined) {
			this._listId = l;
			this._fieldsToUpdate.push('listId');
		} else {
			throw new Error('You cannot move items between lists.');
		}
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

	set quantity(q: string | number | undefined) {
		if (typeof q === 'number') {
			q = q.toString();
		}

		this._quantity = q;
		this._fieldsToUpdate.push('quantity');
	}

	get details(): string | undefined {
		return this._details;
	}

	set details(d: string | undefined) {
		this._details = d;
		this._fieldsToUpdate.push('details');
	}

	get checked(): boolean | undefined {
		return this._checked;
	}

	set checked(c: boolean | undefined) {
		if (c !== undefined && typeof c !== 'boolean') {
			throw new TypeError('Checked must be a boolean.');
		}

		this._checked = c;
		this._fieldsToUpdate.push('checked');
	}

	get userId(): string | undefined {
		return this._userId;
	}

	set userId(_: string | undefined) {
		throw new Error('Cannot set user ID of an item after creation.');
	}

	get categoryMatchId(): string | undefined {
		return this._categoryMatchId;
	}

	set categoryMatchId(i: string | undefined) {
		this._categoryMatchId = i;
		this._fieldsToUpdate.push('categoryMatchId');
	}

	get manualSortIndex(): number | undefined {
		return this._manualSortIndex;
	}

	set manualSortIndex(i: number | undefined) {
		if (i !== undefined && typeof i !== 'number') {
			throw new TypeError('Sort index must be a number.');
		}

		this._manualSortIndex = i;
		this._fieldsToUpdate.push('manualSortIndex');
	}

	/**
   * Save local changes to item to AnyList's API.
   * Must set `isFavorite=true` if editing "favorites" list
   */
	async save(isFavorite = false): Promise<void> {
		const ops = this._fieldsToUpdate.map(field => {
			const value = (this as any)[field];
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
				op.setUpdatedValue(value ? 'y' : 'n');
			} else {
				op.setUpdatedValue(value.toString());
			}

			return op;
		});

		const opList = new this._protobuf.PBListOperationList();

		opList.setOperations(ops);

		const form = new FormData();

		form.append('operations', opList.toBuffer());

		await this._client.post(
			isFavorite ? 'data/starter-lists/update' : 'data/shopping-lists/update',
			{
				body: form,
			},
		);
	}
}

export default Item;
