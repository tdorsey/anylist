const FormData = require('form-data');
const Joi = require('joi');
const uuid = require('./uuid');

// Pydantic-like schema for RecipeCollection validation
const RecipeCollectionSchema = Joi.object({
	identifier: Joi.string().default(() => uuid()),
	timestamp: Joi.number().default(() => Date.now() / 1000),
	name: Joi.string().required(),
	recipeIds: Joi.array().items(Joi.string()).default([]),
	collectionSettings: Joi.any().default(null),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * RecipeCollection class.
 * @class
 *
 * @param {object} recipeCollection recipeCollection
 * @param {object} context context
 *
 * @property {string} identifier
 * @property {string} timestamp
 * @property {string} name
 * @property {string[]} recipeIds
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
class RecipeCollection {
	/**
   * @hideconstructor
   */
	constructor(recipeCollection, {client, protobuf, uid, recipeDataId}) {
		// Validate input using pydantic-like schema
		const {error, value} = RecipeCollectionSchema.validate(recipeCollection || {});

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`RecipeCollection validation failed: ${errorMessage}`);
		}

		this._client = client;
		this.protobuf = protobuf;
		this.uid = uid;
		this.recipeDataId = recipeDataId;

		this.identifier = value.identifier;
		this.timestamp = value.timestamp;
		this.name = value.name;
		this.recipeIds = value.recipeIds;
		this.collectionSettings = value.collectionSettings || new this.protobuf.PBRecipeCollectionSettings();
	}

	_encode() {
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
		  * @return {Promise}
		  */
	async save() {
		await this.performOperation('new-recipe-collection');
	}

	/**
		  * Delete a recipe collection from AnyList.
		  * @return {Promise}
		  */
	async delete() {
		await this.performOperation('remove-recipe-collection');
	}

	/**
		  * Adds an existing recipe to an existing recipe-collection on AnyList.
		  * @return {Promise}
		  */
	async addRecipe(recipeId) {
		if (recipeId) {
			this.recipeIds.push(recipeId);
			await this.performOperation('add-recipes-to-collection');
		}
	}

	/**
		  * Remove existing recipe from an existing recipe-collection on AnyList.
		  * @return {Promise}
		  */
	async removeRecipe(recipeId) {
		const recipeIdPos = this.recipeIds.indexOf(recipeId);
		if (recipeIdPos > -1) {
			await this.performOperation('remove-recipes-from-collection');
			this.recipeIds.splice(recipeIdPos, 1);
		}
	}
}
module.exports = RecipeCollection;
