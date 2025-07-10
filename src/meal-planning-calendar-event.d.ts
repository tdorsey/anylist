/**
 * Data structure for meal planning calendar event information.
 * 
 * @example
 * ```typescript
 * const eventData: MealPlanningCalendarEventData = {
 *   identifier: 'event-123',
 *   title: 'Family Dinner',
 *   date: new Date('2024-01-15'),
 *   recipeId: 'recipe-456'
 * };
 * ```
 */
export type MealPlanningCalendarEventData = {
	/** Unique identifier for the calendar event */
	identifier?: string;
	/** Title of the meal event */
	title?: string;
	/** Date for the meal event */
	date?: Date | string;
	/** Additional details about the meal plan */
	details?: string;
	/** ID of the label associated with this event */
	labelId?: string;
	/** Logical timestamp for ordering */
	logicalTimestamp?: number;
	/** Sort index for order added */
	orderAddedSortIndex?: number;
	/** ID of the recipe associated with this meal */
	recipeId?: string;
	/** Scale factor for recipe servings */
	recipeScaleFactor?: number;
};