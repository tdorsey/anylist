import FormData from 'form-data';
import { ListData, AnyListContext } from './types';
import { Item } from './item';
import uuid from './uuid';

/**
 * List class for managing shopping lists.
 */
export class List {
  public readonly identifier?: string;
  public readonly parentId?: string;
  public readonly name?: string;
  public items: Item[];
  private client: any;
  private protobuf: any;
  private uid?: string;

  constructor(list: ListData, context: AnyListContext) {
    this.identifier = list.identifier;
    this.parentId = list.listId;
    this.name = list.name;

    this.items = (list.items || []).map((i) => new Item(i, context));
    this.client = context.client;
    this.protobuf = context.protobuf;
    this.uid = context.uid;
  }

  /**
   * Adds an item to this list.
   * Will also save item to local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
  async addItem(item: Item, isFavorite = false): Promise<Item> {
    if (!(item instanceof Item)) {
      throw new TypeError('Must be an instance of the Item class.');
    }

    item.listId = this.identifier;

    const op = new this.protobuf.PBListOperation();

    op.setMetadata({
      operationId: uuid(),
      handlerId: isFavorite ? 'add-item' : 'add-shopping-list-item',
      userId: this.uid,
    });

    op.setListId(this.identifier);
    op.setListItemId(item.identifier);
    op.setListItem(item._encode());

    const ops = new this.protobuf.PBListOperationList();

    ops.setOperations([op]);

    const form = new FormData();

    form.append('operations', ops.toBuffer());
    await this.client.post(
      isFavorite ? 'data/starter-lists/update' : 'data/shopping-lists/update',
      {
        body: form,
      }
    );

    this.items.push(item);

    return item;
  }

  /**
   * Uncheck all items in a list
   */
  async uncheckAll(): Promise<void> {
    const op = new this.protobuf.PBListOperation();

    op.setMetadata({
      operationId: uuid(),
      handlerId: 'uncheck-all',
      userId: this.uid,
    });

    op.setListId(this.identifier);
    const ops = new this.protobuf.PBListOperationList();
    ops.setOperations([op]);
    const form = new FormData();
    form.append('operations', ops.toBuffer());
    await this.client.post('data/shopping-lists/update', {
      body: form,
    });
  }

  /**
   * Remove an item from this list.
   * Will also remove item from local copy of list.
   * Must set `isFavorite=true` if editing "favorites" list
   */
  async removeItem(item: Item, isFavorite = false): Promise<void> {
    const op = new this.protobuf.PBListOperation();

    op.setMetadata({
      operationId: uuid(),
      handlerId: isFavorite ? 'remove-item' : 'remove-shopping-list-item',
      userId: this.uid,
    });

    op.setListId(this.identifier);
    op.setListItemId(item.identifier);
    op.setListItem(item._encode());

    const ops = new this.protobuf.PBListOperationList();

    ops.setOperations([op]);

    const form = new FormData();

    form.append('operations', ops.toBuffer());

    await this.client.post(
      isFavorite ? 'data/starter-lists/update' : 'data/shopping-lists/update',
      {
        body: form,
      }
    );

    this.items = this.items.filter((i) => i.identifier !== item.identifier);
  }

  /**
   * Get Item from List by identifier.
   */
  getItemById(identifier: string): Item | undefined {
    return this.items.find((i) => i.identifier === identifier);
  }

  /**
   * Get Item from List by name.
   */
  getItemByName(name: string): Item | undefined {
    return this.items.find((i) => i.name === name);
  }
}

export default List;