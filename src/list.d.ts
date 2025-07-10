import type { ItemData } from './item.d';

/**
 * Data structure for shopping list information.
 * 
 * @example
 * ```typescript
 * const listData: ListData = {
 *   identifier: 'list-123',
 *   listId: 'parent-456',
 *   name: 'Grocery Shopping',
 *   items: []
 * };
 * ```
 */
export type ListData = {
	/** Unique identifier for the list */
	identifier?: string;
	/** Parent list ID if this is a sub-list */
	listId?: string;
	/** Display name of the list */
	name?: string;
	/** Array of items in this list */
	items?: ItemData[];
};