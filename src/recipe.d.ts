import type { IngredientData } from './ingredient.d';

/**
 * Data structure for recipe information with full metadata.
 * 
 * @example
 * ```typescript
 * const recipeData: RecipeData = {
 *   name: 'Chocolate Chip Cookies',
 *   note: 'Family favorite recipe',
 *   sourceName: 'Grandma\'s Recipe Book',
 *   sourceUrl: 'https://example.com/recipe',
 *   ingredients: [
 *     { name: 'Flour', quantity: '2 cups' },
 *     { name: 'Sugar', quantity: '1 cup' }
 *   ],
 *   preparationSteps: [
 *     'Preheat oven to 350°F',
 *     'Mix dry ingredients',
 *     'Add wet ingredients and mix'
 *   ],
 *   cookTime: 15,
 *   prepTime: 20,
 *   servings: '24 cookies',
 *   rating: 5
 * };
 * ```
 */
export type RecipeData = {
	/** Unique identifier for the recipe */
	identifier?: string;
	/** Timestamp when recipe was last modified */
	timestamp?: number;
	/** Recipe title/name */
	name?: string;
	/** Additional notes or description */
	note?: string;
	/** Name of the recipe source (cookbook, website, etc.) */
	sourceName?: string;
	/** URL where the recipe was found */
	sourceUrl?: string;
	/** List of ingredients with quantities */
	ingredients?: IngredientData[];
	/** Step-by-step cooking instructions */
	preparationSteps?: string[];
	/** Array of photo IDs associated with this recipe */
	photoIds?: string[];
	/** Advertisement campaign ID if applicable */
	adCampaignId?: string;
	/** URLs of recipe photos */
	photoUrls?: string[];
	/** Scaling factor for adjusting serving sizes */
	scaleFactor?: number;
	/** User rating (typically 1-5 stars) */
	rating?: number;
	/** Timestamp when recipe was created */
	creationTimestamp?: number;
	/** Nutritional information as a string */
	nutritionalInfo?: string;
	/** Cooking time in minutes */
	cookTime?: number;
	/** Preparation time in minutes */
	prepTime?: number;
	/** Number of servings this recipe makes */
	servings?: string;
	/** Paprika app identifier for imported recipes */
	paprikaIdentifier?: string;
};