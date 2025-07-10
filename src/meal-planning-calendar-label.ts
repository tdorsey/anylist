import type {MealPlanningCalendarLabelData} from './meal-planning-calendar-label.d';

/**
 * Meal Planning Calendar Event Label class.
 */
export class MealPlanningCalendarEventLabel {
	public readonly identifier?: string;
	public readonly calendarId?: string;
	public readonly hexColor?: string;
	public readonly logicalTimestamp?: number;
	public readonly name?: string;
	public readonly sortIndex?: number;

	constructor(label: MealPlanningCalendarLabelData) {
		this.identifier = label.identifier;
		this.calendarId = label.calendarId;
		this.hexColor = label.hexColor;
		this.logicalTimestamp = label.logicalTimestamp;
		this.name = label.name;
		this.sortIndex = label.sortIndex;
	}
}

export default MealPlanningCalendarEventLabel;
