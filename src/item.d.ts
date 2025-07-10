/**
 * Data structure for shopping list item information.
 * 
 * @example
 * ```typescript
 * const itemData: ItemData = {
 *   name: 'Organic Milk',
 *   quantity: '1 gallon',
 *   details: 'Low-fat, organic',
 *   checked: false
 * };
 * ```
 */
export type ItemData = {
	/** ID of the list this item belongs to */
	listId?: string;
	/** Unique identifier for the item */
	identifier?: string;
	/** Display name of the item */
	name?: string;
	/** Additional details or notes about the item */
	details?: string;
	/** Quantity to purchase (e.g., "2 lbs", "1 dozen") */
	quantity?: string;
	/** Whether the item has been checked off the list */
	checked?: boolean;
	/** Manual sort order index for custom ordering */
	manualSortIndex?: number;
	/** ID of the user who added this item */
	userId?: string;
	/** Category match ID for automatic categorization */
	categoryMatchId?: string;
};