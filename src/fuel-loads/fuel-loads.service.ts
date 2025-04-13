import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FuelLoad } from '../../libs/entities/fuel-load.entity';
import { CreateFuelLoadDto, UpdateFuelLoadDto } from 'libs/dto/fuel-load.dto';
import { Vehicle } from '../../libs/entities/vehicle.entity';
import { Provider } from '../../libs/entities/provider.entity';
import { User } from '../../libs/entities/user.entity';

@Injectable()
export class FuelLoadService {
  constructor(
    @InjectRepository(FuelLoad)
    private readonly fuelLoadRepo: Repository<FuelLoad>,

    @InjectRepository(Vehicle)
    private readonly vehicleRepo: Repository<Vehicle>,

    @InjectRepository(Provider)
    private readonly providerRepo: Repository<Provider>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
  ) {}

  async create(dto: CreateFuelLoadDto): Promise<FuelLoad> {
    const vehicle = await this.vehicleRepo.findOne({ where: { id: dto.vehicleId } });
    if (!vehicle) throw new NotFoundException('Vehículo no encontrado');

    const provider = await this.providerRepo.findOne({ where: { id: dto.providerId } });
    if (!provider) throw new NotFoundException('Proveedor no encontrado');

    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('Usuario no encontrado');

    const load = this.fuelLoadRepo.create({
      vehicle,
      provider,
      user,
      invoiceNumber: dto.invoiceNumber,
      liters: dto.liters,
      totalPrice: dto.totalPrice,
    });

    return this.fuelLoadRepo.save(load);
  }

  async findAll(): Promise<FuelLoad[]> {
    return this.fuelLoadRepo.find({
      relations: ['vehicle', 'provider', 'user'],
      order: { date: 'DESC' },
    });
  }

  async findOne(id: number): Promise<FuelLoad> {
    const load = await this.fuelLoadRepo.findOne({ where: { id }, relations: ['vehicle', 'provider', 'user'] });
    if (!load) throw new NotFoundException('Carga de combustible no encontrada');
    return load;
  }

  async update(id: number, dto: UpdateFuelLoadDto): Promise<FuelLoad> {
    const load = await this.findOne(id);

    if (dto.vehicleId) {
      const vehicle = await this.vehicleRepo.findOne({ where: { id: dto.vehicleId } });
      if (!vehicle) throw new NotFoundException('Vehículo no encontrado');
      load.vehicle = vehicle;
    }

    if (dto.providerId) {
      const provider = await this.providerRepo.findOne({ where: { id: dto.providerId } });
      if (!provider) throw new NotFoundException('Proveedor no encontrado');
      load.provider = provider;
    }

    if (dto.userId) {
      const user = await this.userRepo.findOne({ where: { id: dto.userId } });
      if (!user) throw new NotFoundException('Usuario no encontrado');
      load.user = user;
    }

    if (dto.invoiceNumber !== undefined) load.invoiceNumber = dto.invoiceNumber;
    if (dto.liters !== undefined) load.liters = dto.liters;
    if (dto.totalPrice !== undefined) load.totalPrice = dto.totalPrice;

    return this.fuelLoadRepo.save(load);
  }

  async remove(id: number): Promise<void> {
    const load = await this.findOne(id);
    await this.fuelLoadRepo.softRemove(load);
  }
}