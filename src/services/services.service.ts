import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Service } from '../../libs/entities/service.entity';
import { Vehicle } from '../../libs/entities/vehicle.entity';
import { Provider } from '../../libs/entities/provider.entity';
import { User } from '../../libs/entities/user.entity';
import { Item, ItemType } from '../../libs/entities/item.entity';

import { CreateServiceDto } from '../../libs/dto/service.dto';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepo: Repository<Service>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,

    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Item)
    private readonly itemRepo: Repository<Item>,
  ) {}

  async create(dto: CreateServiceDto) {
    // Buscar entidades completas
    const vehicle = await this.vehicleRepo.findOne({ where: { id: dto.vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehículo no encontrado');
  
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');
  
    let provider: Provider | null = null;
    if (dto.providerId) {
      provider = await this.providerRepo.findOne({ where: { id: dto.providerId } });
      if (!provider) throw new NotFoundException('Proveedor no encontrado');
    }
  
    // Paso 1: crear el servicio con relaciones reales
    const service = this.serviceRepo.create({
      vehicle, // entidad completa
      user,    // entidad completa
      provider: provider ?? null,
      mileage: dto.mileage,
      description: dto.description,
      type: dto.type,
      performedBy: dto.performedBy,
      cost: dto.cost,
      items: [], // aún no se agregan
    });
  
    // Paso 2: guardar servicio para obtener ID
    const savedService = await this.serviceRepo.save(service);
  
    // Paso 3: crear ítems ligados al servicio
    const items = dto.items.map((i) =>
      this.itemRepo.create({
        name: i.name,
        type: i.type,
        quantity: i.quantity,
        unitPrice: i.unitPrice,
        provider: i.providerId ? { id: i.providerId } : null,
        service: savedService,
      }),
    );
  
    await this.itemRepo.save(items);
  
    // Paso 4: retornar servicio con relaciones
    return this.serviceRepo.findOne({
      where: { id: savedService.id },
      relations: ['vehicle', 'user', 'provider', 'items', 'items.provider'],
    });
  }
  
  

  async findAll() {
    return this.serviceRepo.find({
      relations: ['vehicle', 'provider', 'user', 'items', 'items.provider'],
      order: { date: 'DESC' }, // opcional: los más recientes primero
    });
  }

  async findOne(id: number) {
    const service = await this.serviceRepo.findOne({
      where: { id },
      relations: ['vehicle', 'provider', 'user', 'items', 'items.provider'],
    });

    if (!service) throw new NotFoundException('Servicio no encontrado');
    return service;
  }

  async remove(id: number) {
    const result = await this.serviceRepo.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Servicio no encontrado o ya eliminado');
    }
    return { message: 'Servicio eliminado correctamente' };
  }

  private toItemType(value: string): ItemType {
    const upper = value.toUpperCase();
    if (!Object.values(ItemType).includes(upper as ItemType)) {
      throw new Error(`Tipo de ítem inválido: ${value}`);
    }
    return upper as ItemType;
  }
}
