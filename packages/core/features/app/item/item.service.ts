import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { Item } from './entities';

@Injectable()
export class ItemService {
  items: Item[] = [{ _id: '1', name: 'test' }];

  getAll(): Item[] {
    return this.items;
  }

  getOne(id: string): Item {
    return this.items.find((item: Item) => item._id === id);
  }

  create(itemData: { name: string }): Item {
    const item: Item = { _id: uuidv4(), name: itemData.name };

    this.items.push(item);
    return item;
  }

  update(id: string, itemData: { name?: string }): Item {
    const item = this.getOne(id);
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }

    item.name = itemData.name;
    return item;
  }
}
