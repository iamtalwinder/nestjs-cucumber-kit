import { Injectable } from '@nestjs/common';
import { Item } from './entities';

@Injectable()
export class ItemService {
  private items: Item[] = [{ id: '1', name: 'test' }];

  getAll(): Item[] {
    return this.items;
  }

  getOne(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  create(itemData: { name: string }): Item {
    const newItem: Item = {
      id: Math.random().toString(36).substring(2, 9),
      name: itemData.name,
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, itemData: { name?: string }): Item | undefined {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.name = itemData.name ?? item.name;
      return item;
    }
    return undefined;
  }
}
