const Joi = require('joi');

// Pydantic-like schema for MealPlanningCalendarEventLabel validation
const CalendarEventLabelSchema = Joi.object({
	identifier: Joi.string().required(),
	calendarId: Joi.string().required(),
	hexColor: Joi.string().pattern(/^#[\dA-Fa-f]{6}$/).allow(null, ''),
	logicalTimestamp: Joi.number().required(),
	name: Joi.string().required(),
	sortIndex: Joi.number().required(),
}).options({
	stripUnknown: true,
	abortEarly: false,
});

/**
 * Meal Planning Calendar Event Label class.
 * @class
 *
 * @param {object} label label
 *
 * @property {string} identifier
 * @property {string} calendarId
 * @property {string} hexColor
 * @property {number} logicalTimestamp
 * @property {string} name
 * @property {number} sortIndex
 *
 */
class MealPlanningCalendarEventLabel {
	/**
   * @hideconstructor
   */
	constructor(label) {
		// Validate input using pydantic-like schema
		const {error, value} = CalendarEventLabelSchema.validate(label || {});

		if (error) {
			const errorMessage = error.details.map(detail => detail.message).join(', ');
			throw new Error(`MealPlanningCalendarEventLabel validation failed: ${errorMessage}`);
		}

		this.identifier = value.identifier;
		this.calendarId = value.calendarId;
		this.hexColor = value.hexColor;
		this.logicalTimestamp = value.logicalTimestamp;
		this.name = value.name;
		this.sortIndex = value.sortIndex;
	}
}

module.exports = MealPlanningCalendarEventLabel;
