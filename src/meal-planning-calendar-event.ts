import FormData from 'form-data';
import {type AnyListContext} from './types';
import {type MealPlanningCalendarEventLabel} from './meal-planning-calendar-label';
import {type Recipe} from './recipe';
import uuid from './uuid';

export type MealPlanningCalendarEventData = {
	identifier?: string;
	title?: string;
	date?: Date | string;
	details?: string;
	labelId?: string;
	logicalTimestamp?: number;
	orderAddedSortIndex?: number;
	recipeId?: string;
	recipeScaleFactor?: number;
};

/**
 * Meal Planning Calendar Event class.
 */
export class MealPlanningCalendarEvent {
	public readonly identifier: string;
	public date: Date;
	public details?: string;
	public labelId?: string;
	public logicalTimestamp?: number;
	public orderAddedSortIndex?: number;
	public recipeId?: string;
	public recipeScaleFactor?: number;
	public title?: string;
	public recipe?: Recipe;
	public label?: MealPlanningCalendarEventLabel;

	private readonly _client: any;
	private readonly _protobuf: any;
	private readonly _uid?: string;
	private readonly _isNew: boolean;
	private readonly _calendarId?: string;

	constructor(event: MealPlanningCalendarEventData, context: AnyListContext) {
		this.identifier = event.identifier || uuid();
		this.date = typeof event.date === 'string' ? new Date(event.date) : event.date || new Date();
		this.details = event.details;
		this.labelId = event.labelId;
		this.logicalTimestamp = event.logicalTimestamp;
		this.orderAddedSortIndex = event.orderAddedSortIndex;
		this.recipeId = event.recipeId;
		this.recipeScaleFactor = event.recipeScaleFactor;
		this.title = event.title;

		this._client = context.client;
		this._protobuf = context.protobuf;
		this._uid = context.uid;
		this._isNew = !event.identifier;
		this._calendarId = context.calendarId;
	}

	toJSON(): MealPlanningCalendarEventData & {calendarId?: string; labelSortIndex?: number} {
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
			labelSortIndex: undefined, // This property was referenced but not defined in original
			recipeScaleFactor: this.recipeScaleFactor,
		};
	}

	_encode(): any {
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
			labelSortIndex: undefined, // This property was referenced but not defined in original
			recipeScaleFactor: this.recipeScaleFactor,
		});
	}

	/**
   * Perform a recipe operation.
   */
	private async performOperation(handlerId: string): Promise<void> {
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
   */
	async save(): Promise<void> {
		const operation = this._isNew ? 'new-event' : 'set-event-details';
		await this.performOperation(operation);
	}

	/**
   * Delete this event from the calendar via AnyList's API.
   */
	async delete(): Promise<void> {
		await this.performOperation('delete-event');
	}
}

export default MealPlanningCalendarEvent;
