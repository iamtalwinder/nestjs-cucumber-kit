import { Model } from 'mongoose';
import { BaseFixture } from '../../../lib';
import { ItemDocument } from '../../app/item';

export default class ItemFixture extends BaseFixture {
  async apply(): Promise<void> {
    const itemModel: Model<ItemDocument> = this.app.get('ItemModel');
    const items = [{ _id: '1', name: 'test' }];

    await itemModel.insertMany(items);
  }
}
