import { EventEmitter } from 'events';

type AnyListContext$1 = {
    client: any;
    protobuf: any;
    uid?: string;
    accessToken?: string;
    clientId?: string;
    recipeDataId?: string;
    calendarId?: string;
};

type ItemData = {
    listId?: string;
    identifier?: string;
    name?: string;
    details?: string;
    quantity?: string;
    checked?: boolean;
    manualSortIndex?: number;
    userId?: string;
    categoryMatchId?: string;
};
/**
 * Item class for list items.
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
    constructor(item: ItemData, context: AnyListContext$1);
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

type ListData = {
    identifier?: string;
    listId?: string;
    name?: string;
    items?: ItemData[];
};
/**
 * List class for managing shopping lists.
 */
declare class List {
    readonly identifier?: string;
    readonly parentId?: string;
    readonly name?: string;
    items: Item[];
    private readonly client;
    private readonly protobuf;
    private readonly uid?;
    constructor(list: ListData, context: AnyListContext$1);
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
    constructor(ingredient: IngredientData, context: AnyListContext$1);
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

type RecipeData = {
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
};
/**
 * Recipe class for managing recipes.
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
    constructor(recipe: RecipeData, context: AnyListContext$1);
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
    constructor(recipeCollection: RecipeCollectionData, context: AnyListContext$1);
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
    constructor(event: MealPlanningCalendarEventData, context: AnyListContext$1);
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

type AnyListOptions = {
    email: string;
    password: string;
    credentialsFile?: string | undefined;
};
type AnyListContext = {
    client: any;
    protobuf: any;
    uid?: string;
    accessToken?: string;
    clientId?: string;
    recipeDataId?: string;
    calendarId?: string;
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
 * AnyList class. There should be one instance per account.
 *
 * @fires AnyList#lists-update
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
    constructor(options: AnyListOptions);
    /**
   * Log into the AnyList account provided in the constructor.
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
   * Load all lists from account into memory.
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

export { AnyList, type AnyListContext, type AnyListOptions, type AuthTokenResponse, Ingredient, type IngredientData, Item, type ItemData, List, type ListData, MealPlanningCalendarEvent, type MealPlanningCalendarEventData, MealPlanningCalendarEventLabel, type MealPlanningCalendarLabelData, type NutritionalInfo, Recipe, RecipeCollection, type RecipeCollectionData, type RecipeData, type StoredCredentials, type UserDataResponse, AnyList as default };
