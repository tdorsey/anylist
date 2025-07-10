import { EventEmitter } from 'events';
import crypto from 'crypto';
import fs from 'fs';
import os from 'os';
import path from 'path';
import { Buffer } from 'buffer';
import got, { Got } from 'got';
import WebSocket from 'reconnecting-websocket';
import WS from 'ws';
// @ts-ignore - protobufjs types are complicated
import * as protobuf from 'protobufjs';
import FormData from 'form-data';
import * as definitions from './definitions.json';
import { List } from './list';
import { Item } from './item';
import uuid from './uuid';
import { Recipe } from './recipe';
import { RecipeCollection } from './recipe-collection';
import { MealPlanningCalendarEvent } from './meal-planning-calendar-event';
import { MealPlanningCalendarEventLabel } from './meal-planning-calendar-label';
import {
  AnyListOptions,
  StoredCredentials,
  AuthTokenResponse,
  UserDataResponse,
  ItemData,
  MealPlanningCalendarEventData,
  RecipeData,
  RecipeCollectionData,
} from './types';

const CREDENTIALS_KEY_CLIENT_ID = 'clientId';
const CREDENTIALS_KEY_ACCESS_TOKEN = 'accessToken';
const CREDENTIALS_KEY_REFRESH_TOKEN = 'refreshToken';

/**
 * AnyList class. There should be one instance per account.
 * 
 * @fires AnyList#lists-update
 */
export class AnyList extends EventEmitter {
  public lists: List[] = [];
  public favoriteItems: List[] = [];
  public recentItems: Record<string, Item[]> = {};
  public recipes: Recipe[] = [];
  public mealPlanningCalendarEvents?: MealPlanningCalendarEvent[];
  public mealPlanningCalendarEventLabels?: MealPlanningCalendarEventLabel[];
  public recipeDataId?: string;
  public calendarId?: string;

  private email: string;
  private password: string;
  private credentialsFile?: string | null;
  private authClient: Got;
  private client: Got;
  private protobuf: any;
  private clientId?: string;
  private accessToken?: string;
  private refreshToken?: string;
  private _userData?: any;
  private ws?: WebSocket;
  private _heartbeatPing?: NodeJS.Timeout;

  constructor(options: AnyListOptions) {
    super();

    this.email = options.email;
    this.password = options.password;
    this.credentialsFile = options.credentialsFile ?? path.join(os.homedir(), '.anylist_credentials');

    this.authClient = got.extend({
      headers: {
        'X-AnyLeaf-API-Version': '3',
      },
      prefixUrl: 'https://www.anylist.com',
      followRedirect: false,
      hooks: {
        beforeError: [
          (error) => {
            const { response } = error;
            if (response?.request?.options?.url) {
              const url = response.request.options.url.href;
              console.error(`Endpoint ${url} returned uncaught status code ${response.statusCode}`);
            }
            return error;
          },
        ],
      },
    });

    this.client = this.authClient.extend({
      mutableDefaults: true,
      hooks: {
        beforeRequest: [
          (options) => {
            options.headers = {
              'X-AnyLeaf-Client-Identifier': this.clientId!,
              authorization: `Bearer ${this.accessToken}`,
              ...options.headers,
            };

            const pathname = options.url!.pathname;
            if (pathname.startsWith('/data/')) {
              options.responseType = 'buffer';
            }
          },
        ],
        afterResponse: [
          async (response, retryWithMergedOptions) => {
            if (response.statusCode !== 401) {
              return response;
            }

            const url = response.request.options.url!.href;
            console.info(`Endpoint ${url} returned status code 401, refreshing access token before retrying`);

            await this._refreshTokens();
            return retryWithMergedOptions({
              headers: {
                authorization: `Bearer ${this.accessToken}`,
              },
            });
          },
        ],
        beforeError: [
          (error) => {
            const { response } = error;
            if (response?.request?.options?.url) {
              const url = response.request.options.url.href;
              console.error(`Endpoint ${url} returned uncaught status code ${response.statusCode}`);
            }
            return error;
          },
        ],
      },
    });

    this.protobuf = protobuf.newBuilder({}).import(definitions).build('pcov.proto');
  }

  /**
   * Log into the AnyList account provided in the constructor.
   */
  async login(connectWebSocket = true): Promise<void> {
    await this._loadCredentials();
    this.clientId = await this._getClientId();

    if (!this.accessToken || !this.refreshToken) {
      console.info('No saved tokens found, fetching new tokens using credentials');
      await this._fetchTokens();
    }

    if (connectWebSocket) {
      this._setupWebSocket();
    }
  }

  private async _fetchTokens(): Promise<void> {
    const form = new FormData();
    form.append('email', this.email);
    form.append('password', this.password);

    const result = await this.authClient.post('auth/token', {
      body: form,
    }).json<AuthTokenResponse>();

    this.accessToken = result.access_token;
    this.refreshToken = result.refresh_token;
    await this._storeCredentials();
  }

  private async _refreshTokens(): Promise<void> {
    const form = new FormData();
    form.append('refresh_token', this.refreshToken!);

    try {
      const result = await this.authClient.post('auth/token/refresh', {
        body: form,
      }).json<AuthTokenResponse>();

      this.accessToken = result.access_token;
      this.refreshToken = result.refresh_token;
      await this._storeCredentials();
    } catch (error: any) {
      if (error.response?.statusCode !== 401) {
        throw error;
      }

      console.info('Failed to refresh access token, fetching new tokens using credentials');
      await this._fetchTokens();
    }
  }

  private async _getClientId(): Promise<string> {
    if (this.clientId) {
      return this.clientId;
    }

    console.info('No saved clientId found, generating new clientId');

    const clientId = uuid();
    this.clientId = clientId;
    await this._storeCredentials();
    return clientId;
  }

  private async _loadCredentials(): Promise<void> {
    if (!this.credentialsFile) {
      return;
    }

    if (!fs.existsSync(this.credentialsFile)) {
      console.info('Credentials file does not exist, not loading saved credentials');
      return;
    }

    try {
      const encrypted = await fs.promises.readFile(this.credentialsFile);
      const credentials = this._decryptCredentials(encrypted, this.password);
      this.clientId = credentials[CREDENTIALS_KEY_CLIENT_ID];
      this.accessToken = credentials[CREDENTIALS_KEY_ACCESS_TOKEN];
      this.refreshToken = credentials[CREDENTIALS_KEY_REFRESH_TOKEN];
    } catch (error: any) {
      console.error(`Failed to read stored credentials: ${error.stack}`);
    }
  }

  private async _storeCredentials(): Promise<void> {
    if (!this.credentialsFile) {
      return;
    }

    const credentials: StoredCredentials = {
      [CREDENTIALS_KEY_CLIENT_ID]: this.clientId,
      [CREDENTIALS_KEY_ACCESS_TOKEN]: this.accessToken,
      [CREDENTIALS_KEY_REFRESH_TOKEN]: this.refreshToken,
    };
    try {
      const encrypted = this._encryptCredentials(credentials, this.password);
      await fs.promises.writeFile(this.credentialsFile, encrypted);
    } catch (error: any) {
      console.error(`Failed to write credentials to storage: ${error.stack}`);
    }
  }

  private _encryptCredentials(credentials: StoredCredentials, secret: string): string {
    const plain = JSON.stringify(credentials);
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').slice(0, 32);
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
    let encrypted = cipher.update(plain);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return JSON.stringify({
      iv: iv.toString('hex'),
      cipher: encrypted.toString('hex'),
    });
  }

  private _decryptCredentials(credentials: Buffer, secret: string): StoredCredentials {
    const encrypted = JSON.parse(credentials.toString());
    const key = crypto.createHash('sha256').update(String(secret)).digest('base64').slice(0, 32);
    const decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), Buffer.from(encrypted.iv, 'hex'));
    let plain = decipher.update(Buffer.from(encrypted.cipher, 'hex'));
    plain = Buffer.concat([plain, decipher.final()]);
    return JSON.parse(plain.toString());
  }

  private _setupWebSocket(): void {
    AuthenticatedWebSocket.token = this.accessToken!;
    AuthenticatedWebSocket.clientId = this.clientId!;

    this.ws = new WebSocket('wss://www.anylist.com/data/add-user-listener', [], {
      WebSocket: AuthenticatedWebSocket as any,
    } as any);

    this.ws.addEventListener('open', () => {
      console.info('Connected to websocket');
      this._heartbeatPing = setInterval(() => {
        this.ws!.send('--heartbeat--');
      }, 5000); // Web app heartbeats every 5 seconds
    });

    this.ws.addEventListener('message', (event: any) => {
      const { data } = event;
      if (data === 'refresh-shopping-lists') {
        console.info('Refreshing shopping lists');

        /**
         * Lists update event
         * (fired when any list is modified by an outside actor).
         * The instance's `.lists` are updated before the event fires.
         *
         * @event AnyList#lists-update
         */
        this.getLists().then((lists) => this.emit('lists-update', lists));
      }
    });

    this.ws.addEventListener('error', (event: any) => {
      const error = event;
      console.error(`Disconnected from websocket: ${error.message}`);
      this._refreshTokens().then(() => {
        AuthenticatedWebSocket.token = this.accessToken!;
      });
    });
  }

  /**
   * Call when you're ready for your program to exit.
   */
  teardown(): void {
    if (this._heartbeatPing) {
      clearInterval(this._heartbeatPing);
    }
    if (this.ws !== undefined) {
      this.ws.close();
    }
  }

  /**
   * Load all lists from account into memory.
   */
  async getLists(refreshCache = true): Promise<List[]> {
    const decoded = await this._getUserData(refreshCache);

    const context = {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined, // This would need to be set from decoded user data
    };

    this.lists = decoded.shoppingListsResponse.newLists.map((list: any) => new List(list, context));

    for (const response of decoded.starterListsResponse.recentItemListsResponse.listResponses) {
      const list = response.starterList;
      this.recentItems[list.listId] = list.items.map((item: any) => new Item(item, context));
    }

    const favoriteLists = decoded.starterListsResponse.favoriteItemListsResponse.listResponses.map(
      (object: any) => object.starterList,
    );

    this.favoriteItems = favoriteLists.map(
      (list: any) => new List(list, context),
    );

    return this.lists;
  }

  /**
   * Get List instance by ID.
   */
  getListById(identifier: string): List | undefined {
    return this.lists.find((l) => l.identifier === identifier);
  }

  /**
   * Get List instance by name.
   */
  getListByName(name: string): List | undefined {
    return this.lists.find((l) => l.name === name);
  }

  /**
   * Get favorite items for a list.
   */
  getFavoriteItemsByListId(identifier: string): List | undefined {
    return this.favoriteItems.find((l) => l.parentId === identifier);
  }

  /**
   * Load all meal planning calendar events from account into memory.
   */
  async getMealPlanningCalendarEvents(refreshCache = true): Promise<MealPlanningCalendarEvent[]> {
    const decoded = await this._getUserData(refreshCache);

    const context = {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
      calendarId: this.calendarId,
    };

    this.mealPlanningCalendarEvents = decoded.mealPlanningCalendarResponse.events.map(
      (event: any) => new MealPlanningCalendarEvent(event, context)
    );

    // Map and assign labels
    this.mealPlanningCalendarEventLabels = decoded.mealPlanningCalendarResponse.labels.map(
      (label: any) => new MealPlanningCalendarEventLabel(label)
    );
    if (this.mealPlanningCalendarEvents && this.mealPlanningCalendarEventLabels) {
      for (const event of this.mealPlanningCalendarEvents) {
        event.label = this.mealPlanningCalendarEventLabels.find(
          (label) => label.identifier === event.labelId
        );
      }
    }

    // Map and assign recipes
    this.recipes = decoded.recipeDataResponse.recipes.map((recipe: any) => new Recipe(recipe, {
      ...context,
      recipeDataId: this.recipeDataId,
    }));
    if (this.mealPlanningCalendarEvents) {
      for (const event of this.mealPlanningCalendarEvents) {
        event.recipe = this.recipes.find((recipe) => recipe.identifier === event.recipeId);
      }
    }

    return this.mealPlanningCalendarEvents || [];
  }

  /**
   * Get the recently added items for a list
   */
  getRecentItemsByListId(listId: string): Item[] | undefined {
    return this.recentItems[listId];
  }

  /**
   * Factory function to create new Items.
   */
  createItem(item: ItemData): Item {
    return new Item(item, {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
    });
  }

  /**
   * Factory function to create a new MealPlanningCalendarEvent.
   */
  async createEvent(eventObject: MealPlanningCalendarEventData): Promise<MealPlanningCalendarEvent> {
    if (!this.calendarId) {
      await this._getUserData();
    }

    return new MealPlanningCalendarEvent(eventObject, {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
      calendarId: this.calendarId,
    });
  }

  /**
   * Load all recipes from account into memory.
   */
  async getRecipes(refreshCache = true): Promise<Recipe[]> {
    const decoded = await this._getUserData(refreshCache);

    this.recipes = decoded.recipeDataResponse.recipes.map((recipe: any) => new Recipe(recipe, {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
      recipeDataId: this.recipeDataId,
    }));
    this.recipeDataId = decoded.recipeDataResponse.recipeDataId;
    return this.recipes;
  }

  /**
   * Factory function to create new Recipes.
   */
  async createRecipe(recipe: RecipeData): Promise<Recipe> {
    if (!this.recipeDataId) {
      await this.getRecipes();
    }

    return new Recipe(recipe, {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
      recipeDataId: this.recipeDataId,
    });
  }

  /**
   * Factory function to create new Recipe Collections.
   */
  createRecipeCollection(recipeCollection: RecipeCollectionData): RecipeCollection {
    return new RecipeCollection(recipeCollection, {
      client: this.client,
      protobuf: this.protobuf,
      uid: undefined,
      recipeDataId: this.recipeDataId,
    });
  }

  private async _getUserData(refreshCache?: boolean): Promise<any> {
    if (!this._userData || refreshCache) {
      const result = await this.client.post('data/user-data/get');
      this._userData = this.protobuf.PBUserDataResponse.decode(result.body);
      this.calendarId = this._userData.mealPlanningCalendarResponse.calendarId;
    }

    return this._userData;
  }
}

class AuthenticatedWebSocket extends WS {
  static token: string;
  static clientId: string;

  constructor(url: string, protocols?: string[]) {
    super(url, protocols, {
      headers: {
        authorization: `Bearer ${AuthenticatedWebSocket.token}`,
        'x-anyleaf-client-identifier': AuthenticatedWebSocket.clientId,
        'X-AnyLeaf-API-Version': '3',
      },
    });
  }
}

export default AnyList;