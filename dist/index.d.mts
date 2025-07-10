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
type ItemData = {
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
type ListData = {
	/** Unique identifier for the list */
	identifier?: string;
	/** Parent list ID if this is a sub-list */
	listId?: string;
	/** Display name of the list */
	name?: string;
	/** Array of items in this list */
	items?: ItemData[];
};

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
type IngredientData = {
	/** Raw ingredient string as entered by user */
	rawIngredient?: string;
	/** Name of the ingredient */
	name?: string;
	/** Quantity needed (e.g., "2 cups", "1 tbsp") */
	quantity?: string;
	/** Additional notes about the ingredient */
	note?: string;
};

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
type RecipeData = {
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
type MealPlanningCalendarEventData = {
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
type MealPlanningCalendarLabelData = {
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

/**
 * Configuration options for the AnyList client.
 * 
 * @example
 * ```typescript
 * const options: AnyListOptions = {
 *   email: 'user@example.com',
 *   password: 'your-password',
 *   credentialsFile: './my-anylist-credentials' // optional
 * };
 * ```
 */
type AnyListOptions = {
	/** Your AnyList account email address */
	email: string;
	/** Your AnyList account password */
	password: string;
	/** 
	 * Optional path to store authentication credentials.
	 * Defaults to ~/.anylist_credentials 
	 */
	credentialsFile?: string | undefined;
};

// Credentials storage
type StoredCredentials = {
	clientId?: string;
	accessToken?: string;
	refreshToken?: string;
};

/**
 * Authentication token response from AnyList API.
 * 
 * @example
 * ```typescript
 * const tokenResponse: AuthTokenResponse = {
 *   access_token: 'abc123...',
 *   refresh_token: 'def456...'
 * };
 * ```
 */
type AuthTokenResponse = {
	/** JWT access token for API authentication */
	access_token: string;
	/** Token to refresh the access token when expired */
	refresh_token: string;
};

/**
 * User data response from authentication containing all user's data.
 * 
 * @example
 * ```typescript
 * const userData: UserDataResponse = {
 *   shoppingListsResponse: { newLists: [] },
 *   recipeDataResponse: { recipes: [], recipeDataId: 'id-123' }
 * };
 * ```
 */
type UserDataResponse = {
	/** Shopping lists data */
	shoppingListsResponse: {
		newLists: ListData[];
	};
	/** Starter lists for suggestions */
	starterListsResponse: {
		recentItemListsResponse: {
			listResponses: Array<{
				starterList: ListData;
			}>;
		};
		favoriteItemListsResponse: {
			listResponses: Array<{
				starterList: ListData;
			}>;
		};
	};
	/** Recipe data and metadata */
	recipeDataResponse: {
		recipes: RecipeData[];
		recipeDataId: string;
	};
	/** Meal planning calendar data */
	mealPlanningCalendarResponse: {
		events: MealPlanningCalendarEventData[];
		labels: MealPlanningCalendarLabelData[];
		calendarId: string;
	};
};

export type { AnyListOptions, AuthTokenResponse, StoredCredentials, UserDataResponse };
