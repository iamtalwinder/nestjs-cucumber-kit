import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from './entities';
import { ItemDto } from './dto';

@Controller('item')
export class ItemController {
  constructor(private readonly itemService: ItemService) {}

  @Get()
  getAllItems(): Item[] {
    return this.itemService.getAll();
  }

  @Get(':id')
  getItem(@Param('id') id: string): Item {
    return this.itemService.getOne(id);
  }

  @Post()
  createItem(@Body() createItemDto: ItemDto): Item {
    return this.itemService.create(createItemDto);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() updateItemDto: ItemDto): Item {
    return this.itemService.update(id, updateItemDto);
  }
}
