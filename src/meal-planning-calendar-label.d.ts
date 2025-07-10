/**
 * Data structure for meal planning calendar event label information.
 * 
 * @example
 * ```typescript
 * const labelData: MealPlanningCalendarLabelData = {
 *   identifier: 'label-123',
 *   name: 'Family Dinner',
 *   hexColor: '#ff6b6b',
 *   calendarId: 'cal-456'
 * };
 * ```
 */
export type MealPlanningCalendarLabelData = {
	/** Unique identifier for the label */
	identifier?: string;
	/** Calendar ID this label belongs to */
	calendarId?: string;
	/** Hex color code for the label */
	hexColor?: string;
	/** Logical timestamp for ordering */
	logicalTimestamp?: number;
	/** Display name of the label */
	name?: string;
	/** Sort index for label ordering */
	sortIndex?: number;
};