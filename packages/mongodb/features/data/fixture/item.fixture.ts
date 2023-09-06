import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { BaseFixture } from '@nestjs-cucumber-kit/core';
import { Item, ItemDocument } from '../../app/item';

export default class ItemFixture extends BaseFixture {
  async apply(): Promise<void> {
    const itemModel: Model<ItemDocument> = this.app.get(getModelToken(Item.name));
    const items = [
      { _id: '1', name: 'test' },
      { _id: '2', name: 'test' },
    ];

    await itemModel.insertMany(items);
  }
}
