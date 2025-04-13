import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { FuelLoadService } from './fuel-loads.service';
import {
  CreateFuelLoadDto,
  UpdateFuelLoadDto,
} from 'libs/dto/fuel-load.dto';

@Controller('fuel-loads')
export class FuelLoadController {
  constructor(private readonly fuelLoadService: FuelLoadService) {}

  @Post()
  async create(@Body() dto: CreateFuelLoadDto) {
    return this.fuelLoadService.create(dto);
  }

  @Get()
  async findAll() {
    return this.fuelLoadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.fuelLoadService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateFuelLoadDto,
  ) {
    return this.fuelLoadService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number) {
    return this.fuelLoadService.remove(id);
  }
}
