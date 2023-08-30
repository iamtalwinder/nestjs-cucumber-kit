import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';
import { ItemResolver } from './item.resolver';

@Module({
  controllers: [ItemController],
  providers: [ItemResolver, ItemService],
})
export class ItemModule {}
