// Update the interface in types.ts to match actual properties
export interface MealPlanningCalendarLabelData {
  identifier?: string;
  calendarId?: string;
  hexColor?: string;
  logicalTimestamp?: number;
  name?: string;
  sortIndex?: number;
}

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