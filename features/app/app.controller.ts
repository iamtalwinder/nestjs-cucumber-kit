import { Controller, Get, Post, Put, Body, Param } from '@nestjs/common';
import { AppService, Item } from './app.service';

@Controller('item')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getAllItems(): Item[] {
    return this.appService.getAll();
  }

  @Get(':id')
  getItem(@Param('id') id: string): Item {
    return this.appService.getOne(id);
  }

  @Post()
  createItem(@Body() itemData: any): Item {
    return this.appService.create(itemData);
  }

  @Put(':id')
  updateItem(@Param('id') id: string, @Body() itemData: any): Item {
    return this.appService.update(id, itemData);
  }
}
