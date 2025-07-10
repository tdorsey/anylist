import type { ListData } from './list.d';
import type { RecipeData } from './recipe.d';
import type { MealPlanningCalendarEventData } from './meal-planning-calendar-event.d';
import type { MealPlanningCalendarLabelData } from './meal-planning-calendar-label.d';

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
export type AnyListOptions = {
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
export type StoredCredentials = {
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
export type AuthTokenResponse = {
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
export type UserDataResponse = {
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