const FormData = require('form-data');
const Joi = require('joi');
const Ingredient = require('./ingredient');
const uuid = require('./uuid');

// Pydantic-like schema for Recipe validation
const RecipeSchema = Joi.object({
	identifier: Joi.string().default(() => uuid()),
	timestamp: Joi.number().default(() => Date.now() / 1000),
	name: Joi.string().allow(null, ''),
	note: Joi.string().allow(null, ''),
	sourceName: Joi.string().allow(null, ''),
	sourceUrl: Joi.string().uri().allow(null, ''),
	ingredients: Joi.array().items(Joi.object()).default([]),
	preparationSteps: Joi.array().items(Joi.string()).default([]),
	photoIds: Joi.array().items(Joi.string()).default([]),
	photoUrls: Joi.array().items(Joi.string().uri()).default([]),
	adCampaignId: Joi.string().allow(null, ''),
	scaleFactor: Joi.number().allow(null),
	rating: Joi.number().min(0).max(5).allow(null),
	creationTimestamp: Joi.number().allow(null),
	nutritionalInfo: Joi.string().allow(null, ''),
	cookTime: Joi.number().min(0).allow(null),
	prepTime: Joi.number().min(0).allow(null),
	servings: Joi.string().allow(null, ''),
	paprikaIdentifier: Joi.string().allow(null, ''),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * Recipe class.
 * @class
 *
 * @param {object} recipe recipe
 * @param {object} context context
 *
 * @property {string} identifier
 * @property {string} timestamp
 * @property {string} name
 * @property {string} note
 * @property {string} sourceName
 * @property {string} sourceUrl
 * @property {Ingredient[]} ingredients
 * @property {string[]} preparationSteps
 * @property {string[]} photoIds
 * @property {string} adCampaignId
 * @property {string[]} photoUrls
 * @property {double} scaleFactor
 * @property {int} rating
 * @property {string} creationTimestamp
 * @property {string} nutritionalInfo
 * @property {int} cookTime
 * @property {int} prepTime
 * @property {string} servings
 * @property {string} paprikaIdentifier
 */
class Recipe {
	/**
   * @hideconstructor
   */
	constructor(recipe, {client, protobuf, uid, recipeDataId}) {
		// Validate input using pydantic-like schema
		const {error, value} = RecipeSchema.validate(recipe || {});

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`Recipe validation failed: ${errorMessage}`);
		}

		this.identifier = value.identifier;
		this.timestamp = value.timestamp;
		this.name = value.name;
		this.note = value.note;
		this.sourceName = value.sourceName;
		this.sourceUrl = value.sourceUrl;
		this.ingredients = value.ingredients ? value.ingredients.map(i => new Ingredient(i, {client, protobuf, uid})) : [];
		this.preparationSteps = value.preparationSteps;
		this.photoIds = value.photoIds;
		this.photoUrls = value.photoUrls;
		this.adCampaignId = value.adCampaignId;
		this.scaleFactor = value.scaleFactor;
		this.rating = value.rating;
		this.creationTimestamp = value.creationTimestamp;
		this.nutritionalInfo = value.nutritionalInfo;
		this.cookTime = value.cookTime;
		this.prepTime = value.prepTime;
		this.servings = value.servings;
		this.paprikaIdentifier = value.paprikaIdentifier;

		this._client = client;
		this.protobuf = protobuf;
		this.uid = uid;
		this.recipeDataId = recipeDataId;
	}

	_encode() {
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
   * @private
   * @param {string} handlerId - Handler ID for the operation
   * @returns {Promise} - Promise representing the operation result
   */
	async performOperation(handlerId) {
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
     * @return {Promise}
     */
	async save() {
		await this.performOperation('save-recipe');
	}

	/**
     * Delete local changes to recipe to AnyList's API.
     * @return {Promise}
     */
	async delete() {
		await this.performOperation('remove-recipe');
	}
}
module.exports = Recipe;
