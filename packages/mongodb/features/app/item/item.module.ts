import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';
import { Item, ItemSchema } from './entities';

@Module({
  imports: [MongooseModule.forFeature([{ name: Item.name, schema: ItemSchema }])],
  controllers: [ItemController],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
