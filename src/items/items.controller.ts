// src/items/items.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
} from '@nestjs/common';
import { ItemsService } from './items.service';

@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}

  @Get('health')
  healthCheck() {
    return this.itemsService.healthCheck();
  }

  @Post()
  createItem(@Body() dto: any) {
    return this.itemsService.createItem(dto);
  }

  @Patch(':id')
  updateItem(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: any,
  ) {
    return this.itemsService.updateItem(id, dto);
  }

  @Delete(':id')
  deleteItem(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.deleteItem(id);
  }

  @Get(':id')
  getItemById(@Param('id', ParseIntPipe) id: number) {
    return this.itemsService.getItemById(id);
  }

  @Get('service/:serviceId')
  getItemsByService(@Param('serviceId', ParseIntPipe) serviceId: number) {
    return this.itemsService.getItemsByService(serviceId);
  }
}
