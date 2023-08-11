import { Injectable } from '@nestjs/common';

export interface Item {
  id: string;
  name: string;
  // other properties can be added as needed
}

@Injectable()
export class AppService {
  private items: Item[] = [{ id: '1', name: 'test' }];

  getAll(): Item[] {
    return this.items;
  }

  getOne(id: string): Item | undefined {
    return this.items.find(item => item.id === id);
  }

  create(itemData: { name: string }): Item {
    const newItem: Item = {
      id: Math.random().toString(36).substring(2, 9), // simple random ID generator
      name: itemData.name,
      // set other properties from itemData as needed
    };
    this.items.push(newItem);
    return newItem;
  }

  update(id: string, itemData: { name?: string }): Item | undefined {
    const item = this.items.find(item => item.id === id);
    if (item) {
      item.name = itemData.name ?? item.name;
      // update other properties as needed
      return item;
    }
    return undefined;
  }
}
