import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Item, ItemDocument } from './entities';

@Injectable()
export class ItemService {
  constructor(@InjectModel(Item.name) private itemModel: Model<ItemDocument>) {}

  async getAll(): Promise<Item[]> {
    return this.itemModel.find().exec();
  }

  async getOne(id: string): Promise<Item> {
    const item = await this.itemModel.findById(id).exec();
    if (!item) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return item;
  }

  async create(itemData: { name: string }): Promise<Item> {
    const newItem = new this.itemModel(itemData);
    return newItem.save();
  }

  async update(id: string, itemData: { name?: string }): Promise<Item> {
    const updatedItem = await this.itemModel.findByIdAndUpdate(id, itemData, { new: true }).exec();
    if (!updatedItem) {
      throw new NotFoundException(`Item with ID ${id} not found`);
    }
    return updatedItem;
  }
}
