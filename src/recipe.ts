import FormData from 'form-data';
import {type AnyListContext} from './types';
import {Ingredient, type IngredientData} from './ingredient';
import uuid from './uuid';

export type RecipeData = {
	identifier?: string;
	timestamp?: number;
	name?: string;
	note?: string;
	sourceName?: string;
	sourceUrl?: string;
	ingredients?: IngredientData[];
	preparationSteps?: string[];
	photoIds?: string[];
	adCampaignId?: string;
	photoUrls?: string[];
	scaleFactor?: number;
	rating?: number;
	creationTimestamp?: number;
	nutritionalInfo?: string;
	cookTime?: number;
	prepTime?: number;
	servings?: string;
	paprikaIdentifier?: string;
};

/**
 * Recipe class for managing recipes.
 */
export class Recipe {
	public readonly identifier: string;
	public timestamp: number;
	public name?: string;
	public note?: string;
	public sourceName?: string;
	public sourceUrl?: string;
	public ingredients: Ingredient[];
	public preparationSteps: string[];
	public photoIds: string[];
	public photoUrls: string[];
	public adCampaignId?: string;
	public scaleFactor?: number;
	public rating?: number;
	public creationTimestamp?: number;
	public nutritionalInfo?: string;
	public cookTime?: number;
	public prepTime?: number;
	public servings?: string;
	public paprikaIdentifier?: string;

	private readonly _client: any;
	private readonly protobuf: any;
	private readonly uid?: string;
	private readonly recipeDataId?: string;

	constructor(recipe: RecipeData, context: AnyListContext) {
		this.identifier = recipe.identifier || uuid();
		this.timestamp = recipe.timestamp || Date.now() / 1000;
		this.name = recipe.name;
		this.note = recipe.note;
		this.sourceName = recipe.sourceName;
		this.sourceUrl = recipe.sourceUrl;
		this.ingredients = recipe.ingredients
			? recipe.ingredients.map(i => new Ingredient(i, context))
			: [];
		this.preparationSteps = recipe.preparationSteps ?? [];
		this.photoIds = recipe.photoIds ?? [];
		this.photoUrls = recipe.photoUrls ?? [];
		this.adCampaignId = recipe.adCampaignId;
		this.scaleFactor = recipe.scaleFactor;
		this.rating = recipe.rating;
		this.creationTimestamp = recipe.creationTimestamp;
		this.nutritionalInfo = recipe.nutritionalInfo;
		this.cookTime = recipe.cookTime;
		this.prepTime = recipe.prepTime;
		this.servings = recipe.servings;
		this.paprikaIdentifier = recipe.paprikaIdentifier;

		this._client = context.client;
		this.protobuf = context.protobuf;
		this.uid = context.uid;
		this.recipeDataId = context.recipeDataId;
	}

	_encode(): any {
		return new this.protobuf.PBRecipe({
			identifier: this.identifier,
			timestamp: this.timestamp,
			name: this.name,
			note: this.note,
			sourceName: this.sourceName,
			sourceUrl: this.sourceUrl,
			ingredients: this.ingredients.map(x => x._encode()),
			preparationSteps: this.preparationSteps,
			photoIds: this.photoIds,
			adCampaignId: this.adCampaignId,
			photoUrls: this.photoUrls,
			scaleFactor: this.scaleFactor,
			rating: this.rating,
			creationTimestamp: this.creationTimestamp,
			nutritionalInfo: this.nutritionalInfo,
			cookTime: this.cookTime,
			prepTime: this.prepTime,
			servings: this.servings,
			paprikaIdentifier: this.paprikaIdentifier,
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
		op.setRecipeDataId(this.recipeDataId);
		op.setRecipe(this._encode());
		op.setRecipeIds(this.recipeDataId);
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
		await this.performOperation('save-recipe');
	}

	/**
   * Delete local changes to recipe to AnyList's API.
   */
	async delete(): Promise<void> {
		await this.performOperation('remove-recipe');
	}
}

export default Recipe;
