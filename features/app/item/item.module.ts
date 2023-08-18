import { Module } from '@nestjs/common';
import { ItemController } from './item.controller';
import { ItemService } from './item.service';

@Module({
  imports: [],
  controllers: [ItemController],
  providers: [ItemService],
})
export class ItemModule {}
