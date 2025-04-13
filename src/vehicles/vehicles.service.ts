import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Vehicle } from '../../libs/entities/vehicle.entity';
import {
  CreateVehicleDto,
  UpdateVehicleDto,
} from '../../libs/dto/vehicle.dto';

@Injectable()
export class VehiclesService {
  constructor(
    @InjectRepository(Vehicle)
    private readonly vehicleRepository: Repository<Vehicle>,
  ) {}

  async createVehicle(dto: CreateVehicleDto): Promise<Vehicle> {
    const vehicle = this.vehicleRepository.create(dto);
    return await this.vehicleRepository.save(vehicle);
  }

  async updateVehicle(id: number, dto: UpdateVehicleDto): Promise<Vehicle> {
    const vehicle = await this.findVehicleById(id);
    Object.assign(vehicle, dto);
    return await this.vehicleRepository.save(vehicle);
  }

  async softDeleteVehicle(id: number): Promise<void> {
    const vehicle = await this.findVehicleById(id);
    vehicle.deletedAt = new Date();
    await this.vehicleRepository.save(vehicle);
  }

  async findAllVehicles(): Promise<Vehicle[]> {
    return await this.vehicleRepository.find({
      where: { deletedAt: IsNull() },
      order: { createdAt: 'DESC' },
    });
  }

  async findVehicleById(id: number): Promise<Vehicle> {
    const vehicle = await this.vehicleRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!vehicle) {
      throw new NotFoundException('Vehículo no encontrado');
    }

    return vehicle;
  }

  health(): string {
    return '🟢 Vehicle service is running';
  }
}
