const FormData = require('form-data');
const Joi = require('joi');
const uuid = require('./uuid');

/// <reference path="./meal-planning-calendar-label.js" />
/// <reference path="./recipe.js" />

// Pydantic-like schema for MealPlanningCalendarEvent validation
const CalendarEventSchema = Joi.object({
	identifier: Joi.string().default(() => uuid()),
	date: Joi.alternatives().try(
		Joi.date(),
		Joi.string().isoDate(),
	).default(() => new Date()),
	details: Joi.string().allow(null, ''),
	labelId: Joi.string().allow(null, ''),
	logicalTimestamp: Joi.number().allow(null),
	orderAddedSortIndex: Joi.number().allow(null),
	recipeId: Joi.string().allow(null, ''),
	recipeScaleFactor: Joi.number().min(0).allow(null),
	title: Joi.string().allow(null, ''),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * Meal Planning Calendar Event class.
 * @class
 *
 * @param {object} event event
 * @param {object[]} labels labels
 * @param {object} context context
 *
 * @property {string} identifier
 * @property {string} calendarId
 * @property {Date} date
 * @property {string=} details
 * @property {string=} labelId
 * @property {MealPlanningCalendarEventLabel=} label
 * @property {number=} logicalTimestamp
 * @property {number=} orderAddedSortIndex
 * @property {string=} recipeId
 * @property {Recipe=} recipe
 * @property {number=} recipeScaleFactor
 * @property {string=} title
 */
class MealPlanningCalendarEvent {
	/**
   * @hideconstructor
   */
	constructor(event, {client, protobuf, uid, calendarId}) {
		// Validate input using pydantic-like schema
		const {error, value} = CalendarEventSchema.validate(event || {});

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`MealPlanningCalendarEvent validation failed: ${errorMessage}`);
		}

		this.identifier = value.identifier;
		this.date = typeof value.date === 'string' ? new Date(value.date) : value.date;
		this.details = value.details;
		this.labelId = value.labelId;
		this.logicalTimestamp = value.logicalTimestamp;
		this.orderAddedSortIndex = value.orderAddedSortIndex;
		this.recipeId = value.recipeId;
		this.recipeScaleFactor = value.recipeScaleFactor;
		this.title = value.title;
		this.recipe = null;
		this.label = null;

		this._client = client;
		this._protobuf = protobuf;
		this._uid = uid;
		this._isNew = !event.identifier;
		this._calendarId = calendarId;
	}

	toJSON() {
		return {
			identifier: this.identifier,
			logicalTimestamp: this.logicalTimestamp,
			calendarId: this._calendarId,
			date: this.date,
			title: this.title,
			details: this.details,
			recipeId: this.recipeId,
			labelId: this.labelId,
			orderAddedSortIndex: this.orderAddedSortIndex,
			labelSortIndex: this.labelSortIndex,
			recipeScaleFactor: this.recipeScaleFactor,
		};
	}

	_encode() {
		return new this._protobuf.PBCalendarEvent({
			identifier: this.identifier,
			logicalTimestamp: this.logicalTimestamp,
			calendarId: this._calendarId,
			date: this.date.toISOString().slice(0, 10), // Only date, no time
			title: this.title,
			details: this.details,
			recipeId: this.recipeId,
			labelId: this.labelId,
			orderAddedSortIndex: this.orderAddedSortIndex,
			labelSortIndex: this.labelSortIndex,
			recipeScaleFactor: this.recipeScaleFactor,
		});
	}

	/**
	 * Perform a recipe operation.
	 * @private
	 * @param {string} handlerId - Handler ID for the operation
	 * @returns {Promise} - Promise representing the operation result
	 */
	async performOperation(handlerId) {
		const ops = new this._protobuf.PBCalendarOperationList();
		const op = new this._protobuf.PBCalendarOperation();

		op.setMetadata({
			operationId: uuid(),
			handlerId,
			userId: this._uid,
		});

		op.setCalendarId(this._calendarId);
		op.setUpdatedEvent(this._encode());
		ops.setOperations([op]);

		const form = new FormData();

		form.append('operations', ops.toBuffer());
		await this._client.post('data/meal-planning-calendar/update', {
			body: form,
		});
	}

	/**
	 * Save local changes to the calendar event to AnyList's API.
	 * @return {Promise}
	 */
	async save() {
		const operation = this._isNew ? 'new-event' : 'set-event-details';
		await this.performOperation(operation);
	}

	/**
	 * Delete this event from the calendar via AnyList's API.
	 * @return {Promise}
	 */
	async delete() {
		await this.performOperation('delete-event');
	}
}

module.exports = MealPlanningCalendarEvent;
