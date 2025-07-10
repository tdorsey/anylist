/**
 * Data structure for recipe collection information.
 * 
 * @example
 * ```typescript
 * const collectionData: RecipeCollectionData = {
 *   identifier: 'collection-123',
 *   name: 'Holiday Recipes',
 *   recipeIds: ['recipe-1', 'recipe-2']
 * };
 * ```
 */
export type RecipeCollectionData = {
	/** Unique identifier for the collection */
	identifier?: string;
	/** Collection name/title */
	name?: string;
	/** Array of recipe IDs in this collection */
	recipeIds?: string[];
};