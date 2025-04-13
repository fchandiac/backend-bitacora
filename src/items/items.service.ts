// src/items/items.service.ts
import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from '../../libs/entities/item.entity';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item)
    private readonly itemRepository: Repository<Item>,
  ) {}

  healthCheck() {
    return { status: 'items service is healthy' };
  }

  async createItem(dto: Partial<Item>): Promise<Item> {
    const item = this.itemRepository.create(dto);
    return await this.itemRepository.save(item);
  }

  async updateItem(id: number, dto: Partial<Item>): Promise<Item> {
    const item = await this.getItemById(id);
    Object.assign(item, dto);
    return await this.itemRepository.save(item);
  }

  async deleteItem(id: number): Promise<void> {
    const item = await this.getItemById(id);
    await this.itemRepository.remove(item);
  }

  async getItemById(id: number): Promise<Item> {
    const item = await this.itemRepository.findOne({
      where: { id },
      relations: ['service', 'provider'],
    });

    if (!item) {
      throw new NotFoundException('Ítem no encontrado');
    }

    return item;
  }

  async getItemsByService(serviceId: number): Promise<Item[]> {
    return await this.itemRepository.find({
      where: {
        service: { id: serviceId },
      },
      relations: ['service', 'provider'],
    });
  }
}
