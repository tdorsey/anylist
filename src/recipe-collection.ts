import FormData from 'form-data';
import {type AnyListContext} from '../lib/types';
import uuid from '../lib/uuid';

export type RecipeCollectionData = {
	identifier?: string;
	name?: string;
	recipeIds?: string[];
};

/**
 * RecipeCollection class for managing recipe collections.
 */
export class RecipeCollection {
	public readonly identifier: string;
	public timestamp: number;
	public name?: string;
	public recipeIds: string[];
	public collectionSettings: any;

	private readonly _client: any;
	private readonly protobuf: any;
	private readonly uid?: string;
	private readonly recipeDataId?: string;

	constructor(recipeCollection: RecipeCollectionData, context: AnyListContext) {
		this._client = context.client;
		this.protobuf = context.protobuf;
		this.uid = context.uid;
		this.recipeDataId = context.recipeDataId;

		this.identifier = recipeCollection.identifier || uuid();
		this.timestamp = Date.now() / 1000;
		this.name = recipeCollection.name;
		this.recipeIds = recipeCollection.recipeIds ?? [];
		this.collectionSettings = new this.protobuf.PBRecipeCollectionSettings();
	}

	_encode(): any {
		return new this.protobuf.PBRecipeCollection({
			identifier: this.identifier,
			timestamp: this.timestamp,
			name: this.name,
			recipeIds: this.recipeIds,
			collectionSettings: this.collectionSettings,
		});
	}

	/**
   * Perform a recipe operation.
   */
	private async performOperation(handlerId: string): Promise<void> {
		const ops = new this.protobuf.PBRecipeOperationList();
		const op = new this.protobuf.PBRecipeOperation();
		op.setMetadata({
			operationId: uuid(),
			handlerId,
			userId: this.uid,
		});

		// May not need recipedataid
		op.setRecipeDataId(this.recipeDataId);
		op.setRecipeCollection(this._encode());
		ops.setOperations(op);

		const form = new FormData();
		form.append('operations', ops.toBuffer());

		await this._client.post('data/user-recipe-data/update', {
			body: form,
		});
	}

	/**
   * Save local changes to recipe to AnyList's API.
   */
	async save(): Promise<void> {
		await this.performOperation('new-recipe-collection');
	}

	/**
   * Delete a recipe collection from AnyList.
   */
	async delete(): Promise<void> {
		await this.performOperation('remove-recipe-collection');
	}

	/**
   * Adds an existing recipe to an existing recipe-collection on AnyList.
   */
	async addRecipe(recipeId: string): Promise<void> {
		if (recipeId) {
			this.recipeIds.push(recipeId);
			await this.performOperation('add-recipes-to-collection');
		}
	}

	/**
   * Remove existing recipe from an existing recipe-collection on AnyList.
   */
	async removeRecipe(recipeId: string): Promise<void> {
		const recipeIdPos = this.recipeIds.indexOf(recipeId);
		if (recipeIdPos > -1) {
			await this.performOperation('remove-recipes-from-collection');
			this.recipeIds.splice(recipeIdPos, 1);
		}
	}
}

export default RecipeCollection;
