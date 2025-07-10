/**
 * Data structure for recipe ingredient information.
 * 
 * @example
 * ```typescript
 * const ingredientData: IngredientData = {
 *   name: 'All-purpose flour',
 *   quantity: '2 cups',
 *   note: 'Sifted'
 * };
 * ```
 */
export type IngredientData = {
	/** Raw ingredient string as entered by user */
	rawIngredient?: string;
	/** Name of the ingredient */
	name?: string;
	/** Quantity needed (e.g., "2 cups", "1 tbsp") */
	quantity?: string;
	/** Additional notes about the ingredient */
	note?: string;
};