import { EventEmitter } from 'events';

type AnyListContext = {
    client: any;
    protobuf: any;
    uid?: string;
    accessToken?: string;
    clientId?: string;
    recipeDataId?: string;
    calendarId?: string;
};

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
 * Represents an individual item in a shopping list with methods for modification.
 *
 * @example
 * ```typescript
 * // Create a new item
 * const item = new Item({
 *   name: 'Bananas',
 *   quantity: '6',
 *   details: 'Ripe, for smoothies'
 * }, context);
 *
 * // Mark item as purchased
 * item.checked = true;
 * await item.save();
 *
 * // Update item properties
 * item.quantity = '12';
 * item.details = 'Extra for baking';
 * await item.save();
 * ```
 *
 * @see {@link List} List class for managing collections of items
 */
declare class Item {
    private _listId?;
    private readonly _identifier;
    private _name?;
    private _details?;
    private _quantity?;
    private _checked?;
    private _manualSortIndex?;
    private readonly _userId?;
    private _categoryMatchId?;
    private readonly _client;
    private readonly _protobuf;
    private readonly _uid?;
    private readonly _fieldsToUpdate;
    constructor(item: ItemData, context: AnyListContext);
    toJSON(): ItemData;
    _encode(): any;
    get identifier(): string;
    set identifier(_: string);
    get listId(): string | undefined;
    set listId(l: string | undefined);
    get name(): string | undefined;
    set name(n: string | undefined);
    get quantity(): string | undefined;
    set quantity(q: string | number | undefined);
    get details(): string | undefined;
    set details(d: string | undefined);
    get checked(): boolean | undefined;
    set checked(c: boolean | undefined);
    get userId(): string | undefined;
    set userId(_: string | undefined);
    get categoryMatchId(): string | undefined;
    set categoryMatchId(i: string | undefined);
    get manualSortIndex(): number | undefined;
    set manualSortIndex(i: number | undefined);
    /**
   * Save local changes to item to AnyList's API.
   * Must set `isFavorite=true` if editing "favorites" list
   */
    save(isFavorite?: boolean): Promise<void>;
}

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
 * Represents a shopping list with items and list management capabilities.
 *
 * @example
 * ```typescript
 * // Access list properties
 * console.log(`List: ${list.name} has ${list.items.length} items`);
 *
 * // Add an item to the list
 * const newItem = list.addItem({ name: 'Milk', quantity: '1 gallon' });
 * await list.saveItem(newItem);
 * ```
 *
 * @see {@link Item} Item class for managing individual list items
 */
declare class List {
    readonly identifier?: string;
    readonly parentId?: string;
    readonly name?: string;
    items: Item[];
    private readonly client;
    private readonly protobuf;
    private readonly uid?;
    constructor(list: ListData, context: AnyListContext);
    /**
   * Adds an item to this list.
   * Will also save item to local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
    addItem(item: Item, isFavorite?: boolean): Promise<Item>;
    /**
   * Uncheck all items in a list
   */
    uncheckAll(): Promise<void>;
    /**
   * Remove an item from this list.
   * Will also remove item from local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
    removeItem(item: Item, isFavorite?: boolean): Promise<void>;
    /**
   * Get Item from List by identifier.
   */
    getItemById(identifier: string): Item | undefined;
    /**
   * Get Item from List by name.
   */
    getItemByName(name: string): Item | undefined;
}

type IngredientData = {
    rawIngredient?: string;
    name?: string;
    quantity?: string;
    note?: string;
};
/**
 * Ingredient class for recipe ingredients.
 */
declare class Ingredient {
    private _rawIngredient?;
    private _name?;
    private _quantity?;
    private _note?;
    private readonly _client;
    private readonly _protobuf;
    private readonly _uid?;
    private readonly _fieldsToUpdate;
    constructor(ingredient: IngredientData, context: AnyListContext);
    toJSON(): IngredientData;
    _encode(): any;
    get rawIngredient(): string | undefined;
    set rawIngredient(n: string | undefined);
    get name(): string | undefined;
    set name(n: string | undefined);
    get quantity(): string | undefined;
    set quantity(q: string | undefined);
    get note(): string | undefined;
    set note(n: string | undefined);
}

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
 * Represents a recipe with ingredients, instructions, and metadata.
 *
 * @example
 * ```typescript
 * // Access recipe properties
 * console.log(`Recipe: ${recipe.name}`);
 * console.log(`Prep time: ${recipe.prepTime} minutes`);
 * console.log(`Serves: ${recipe.servings}`);
 *
 * // Work with ingredients
 * recipe.ingredients.forEach(ingredient => {
 *   console.log(`${ingredient.quantity} ${ingredient.name}`);
 * });
 *
 * // Update recipe rating
 * recipe.rating = 5;
 * await recipe.save();
 * ```
 *
 * @see {@link Ingredient} Ingredient class for recipe ingredients
 * @see {@link RecipeCollection} RecipeCollection class for organizing recipes
 */
declare class Recipe {
    readonly identifier: string;
    timestamp: number;
    name?: string;
    note?: string;
    sourceName?: string;
    sourceUrl?: string;
    ingredients: Ingredient[];
    preparationSteps: string[];
    photoIds: string[];
    photoUrls: string[];
    adCampaignId?: string;
    scaleFactor?: number;
    rating?: number;
    creationTimestamp?: number;
    nutritionalInfo?: string;
    cookTime?: number;
    prepTime?: number;
    servings?: string;
    paprikaIdentifier?: string;
    private readonly _client;
    private readonly protobuf;
    private readonly uid?;
    private readonly recipeDataId?;
    constructor(recipe: RecipeData, context: AnyListContext);
    _encode(): any;
    /**
   * Perform a recipe operation.
   */
    private performOperation;
    /**
   * Save local changes to recipe to AnyList's API.
   */
    save(): Promise<void>;
    /**
   * Delete local changes to recipe to AnyList's API.
   */
    delete(): Promise<void>;
}

type RecipeCollectionData = {
    identifier?: string;
    name?: string;
    recipeIds?: string[];
};
/**
 * RecipeCollection class for managing recipe collections.
 */
declare class RecipeCollection {
    readonly identifier: string;
    timestamp: number;
    name?: string;
    recipeIds: string[];
    collectionSettings: any;
    private readonly _client;
    private readonly protobuf;
    private readonly uid?;
    private readonly recipeDataId?;
    constructor(recipeCollection: RecipeCollectionData, context: AnyListContext);
    _encode(): any;
    /**
   * Perform a recipe operation.
   */
    private performOperation;
    /**
   * Save local changes to recipe to AnyList's API.
   */
    save(): Promise<void>;
    /**
   * Delete a recipe collection from AnyList.
   */
    delete(): Promise<void>;
    /**
   * Adds an existing recipe to an existing recipe-collection on AnyList.
   */
    addRecipe(recipeId: string): Promise<void>;
    /**
   * Remove existing recipe from an existing recipe-collection on AnyList.
   */
    removeRecipe(recipeId: string): Promise<void>;
}

type MealPlanningCalendarLabelData = {
    identifier?: string;
    calendarId?: string;
    hexColor?: string;
    logicalTimestamp?: number;
    name?: string;
    sortIndex?: number;
};
/**
 * Meal Planning Calendar Event Label class.
 */
declare class MealPlanningCalendarEventLabel {
    readonly identifier?: string;
    readonly calendarId?: string;
    readonly hexColor?: string;
    readonly logicalTimestamp?: number;
    readonly name?: string;
    readonly sortIndex?: number;
    constructor(label: MealPlanningCalendarLabelData);
}

type MealPlanningCalendarEventData = {
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
declare class MealPlanningCalendarEvent {
    readonly identifier: string;
    date: Date;
    details?: string;
    labelId?: string;
    logicalTimestamp?: number;
    orderAddedSortIndex?: number;
    recipeId?: string;
    recipeScaleFactor?: number;
    title?: string;
    recipe?: Recipe;
    label?: MealPlanningCalendarEventLabel;
    private readonly _client;
    private readonly _protobuf;
    private readonly _uid?;
    private readonly _isNew;
    private readonly _calendarId?;
    constructor(event: MealPlanningCalendarEventData, context: AnyListContext);
    toJSON(): MealPlanningCalendarEventData & {
        calendarId?: string;
        labelSortIndex?: number;
    };
    _encode(): any;
    /**
   * Perform a recipe operation.
   */
    private performOperation;
    /**
   * Save local changes to the calendar event to AnyList's API.
   */
    save(): Promise<void>;
    /**
   * Delete this event from the calendar via AnyList's API.
   */
    delete(): Promise<void>;
}

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
type StoredCredentials = {
    clientId?: string;
    accessToken?: string;
    refreshToken?: string;
};
type AuthTokenResponse = {
    access_token: string;
    refresh_token: string;
};
type UserDataResponse = {
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
};
type NutritionalInfo = Record<string, string | number>;
/**
 * AnyList API client for managing shopping lists, recipes, and meal planning.
 *
 * @example
 * ```typescript
 * import AnyList from 'anylist';
 *
 * const client = new AnyList({
 *   email: 'user@example.com',
 *   password: 'your-password'
 * });
 *
 * await client.login();
 * const lists = await client.getLists();
 * console.log('Found lists:', lists.map(l => l.name));
 * ```
 *
 * @example
 * ```javascript
 * // JavaScript usage (CommonJS)
 * const AnyList = require('anylist');
 *
 * const client = new AnyList({
 *   email: 'user@example.com',
 *   password: 'your-password'
 * });
 *
 * client.login().then(async () => {
 *   const lists = await client.getLists();
 *   console.log('Found lists:', lists.map(l => l.name));
 * });
 * ```
 *
 * @fires AnyList#lists-update
 * @see {@link https://www.anylist.com} AnyList website
 */
declare class AnyList extends EventEmitter {
    lists: List[];
    favoriteItems: List[];
    recentItems: Record<string, Item[]>;
    recipes: Recipe[];
    mealPlanningCalendarEvents?: MealPlanningCalendarEvent[];
    mealPlanningCalendarEventLabels?: MealPlanningCalendarEventLabel[];
    recipeDataId?: string;
    calendarId?: string;
    private readonly email;
    private readonly password;
    private readonly credentialsFile?;
    private readonly authClient;
    private readonly client;
    private readonly protobuf;
    private clientId?;
    private accessToken?;
    private refreshToken?;
    private _userData?;
    private ws?;
    private _heartbeatPing?;
    /**
     * Creates a new AnyList client instance.
     *
     * @param options - Configuration options for the client
     *
     * @example
     * ```typescript
     * const client = new AnyList({
     *   email: 'user@example.com',
     *   password: 'your-password'
     * });
     * ```
     */
    constructor(options: AnyListOptions);
    /**
     * Authenticates with AnyList using the provided credentials.
     * Automatically handles token storage and refresh.
     *
     * @param connectWebSocket - Whether to establish WebSocket connection for real-time updates. Defaults to true.
     *
     * @example
     * ```typescript
     * await client.login();
     * console.log('Successfully logged in!');
     *
     * // Login without WebSocket connection
     * await client.login(false);
     * ```
     *
     * @throws {Error} When authentication fails due to invalid credentials
     */
    login(connectWebSocket?: boolean): Promise<void>;
    private _fetchTokens;
    private _refreshTokens;
    private _getClientId;
    private _loadCredentials;
    private _storeCredentials;
    private _encryptCredentials;
    private _decryptCredentials;
    private _setupWebSocket;
    /**
   * Call when you're ready for your program to exit.
   */
    teardown(): void;
    /**
     * Retrieves all shopping lists from your AnyList account.
     *
     * @param refreshCache - Whether to fetch fresh data from server. Defaults to true.
     * @returns Promise that resolves to an array of List objects
     *
     * @example
     * ```typescript
     * // Get all lists with fresh data
     * const lists = await client.getLists();
     * console.log('Your lists:', lists.map(list => list.name));
     *
     * // Use cached data (faster)
     * const cachedLists = await client.getLists(false);
     * ```
     *
     * @see {@link List} List class documentation
     */
    getLists(refreshCache?: boolean): Promise<List[]>;
    /**
   * Get List instance by ID.
   */
    getListById(identifier: string): List | undefined;
    /**
   * Get List instance by name.
   */
    getListByName(name: string): List | undefined;
    /**
   * Get favorite items for a list.
   */
    getFavoriteItemsByListId(identifier: string): List | undefined;
    /**
   * Load all meal planning calendar events from account into memory.
   */
    getMealPlanningCalendarEvents(refreshCache?: boolean): Promise<MealPlanningCalendarEvent[]>;
    /**
   * Get the recently added items for a list
   */
    getRecentItemsByListId(listId: string): Item[] | undefined;
    /**
   * Factory function to create new Items.
   */
    createItem(item: ItemData): Item;
    /**
   * Factory function to create a new MealPlanningCalendarEvent.
   */
    createEvent(eventObject: MealPlanningCalendarEventData): Promise<MealPlanningCalendarEvent>;
    /**
   * Load all recipes from account into memory.
   */
    getRecipes(refreshCache?: boolean): Promise<Recipe[]>;
    /**
   * Factory function to create new Recipes.
   */
    createRecipe(recipe: RecipeData): Promise<Recipe>;
    /**
   * Factory function to create new Recipe Collections.
   */
    createRecipeCollection(recipeCollection: RecipeCollectionData): RecipeCollection;
    private _getUserData;
}

export { AnyList, type AnyListOptions, type AuthTokenResponse, Ingredient, type IngredientData, Item, type ItemData, List, type ListData, MealPlanningCalendarEvent, type MealPlanningCalendarEventData, MealPlanningCalendarEventLabel, type MealPlanningCalendarLabelData, type NutritionalInfo, Recipe, RecipeCollection, type RecipeCollectionData, type RecipeData, type StoredCredentials, type UserDataResponse, AnyList as default };
