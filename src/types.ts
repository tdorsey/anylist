// Core type definitions for AnyList API

export interface AnyListOptions {
  email: string;
  password: string;
  credentialsFile?: string | null;
}

export interface IngredientData {
  rawIngredient?: string;
  name?: string;
  quantity?: string;
  note?: string;
}

export interface ItemData {
  listId?: string;
  identifier?: string;
  name?: string;
  details?: string;
  quantity?: string;
  checked?: boolean;
  manualSortIndex?: number;
  userId?: string;
  categoryMatchId?: string;
}

export interface ListData {
  identifier?: string;
  listId?: string;
  name?: string;
  items?: ItemData[];
}

export interface RecipeData {
  identifier?: string;
  timestamp?: number;
  name?: string;
  note?: string;
  sourceName?: string;
  sourceUrl?: string;
  ingredients?: IngredientData[];
  preparationSteps?: string[];
  photoIds?: string[];
  adCampaignId?: string;
  photoUrls?: string[];
  scaleFactor?: number;
  rating?: number;
  creationTimestamp?: number;
  nutritionalInfo?: string;
  cookTime?: number;
  prepTime?: number;
  servings?: string;
  paprikaIdentifier?: string;
}

export interface RecipeCollectionData {
  identifier?: string;
  name?: string;
  recipeIds?: string[];
}

export interface MealPlanningCalendarEventData {
  identifier?: string;
  title?: string;
  date?: Date | string;
  details?: string;
  labelId?: string;
  logicalTimestamp?: number;
  orderAddedSortIndex?: number;
  recipeId?: string;
  recipeScaleFactor?: number;
}

export interface MealPlanningCalendarLabelData {
  identifier?: string;
  calendarId?: string;
  hexColor?: string;
  logicalTimestamp?: number;
  name?: string;
  sortIndex?: number;
}

export interface NutritionalInfo {
  [key: string]: string | number;
}

// Internal context interface for dependency injection
export interface AnyListContext {
  client: any; // got instance
  protobuf: any; // protobuf definitions
  uid?: string;
  accessToken?: string;
  clientId?: string;
  recipeDataId?: string;
  calendarId?: string;
}

// Credentials storage
export interface StoredCredentials {
  clientId?: string;
  accessToken?: string;
  refreshToken?: string;
}

// API Response types (partial - these would be extensive based on protobuf definitions)
export interface AuthTokenResponse {
  access_token: string;
  refresh_token: string;
}

export interface UserDataResponse {
  shoppingListsResponse: {
    newLists: ListData[];
  };
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
  recipeDataResponse: {
    recipes: RecipeData[];
    recipeDataId: string;
  };
  mealPlanningCalendarResponse: {
    events: MealPlanningCalendarEventData[];
    labels: MealPlanningCalendarLabelData[];
    calendarId: string;
  };
}