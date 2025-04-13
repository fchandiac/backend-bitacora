import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Provider } from '../../libs/entities/provider.entity';
import {
  CreateProviderDto,
  UpdateProviderDto,
} from '../../libs/dto/provider.dto';

@Injectable()
export class ProvidersService {
  constructor(
    @InjectRepository(Provider)
    private readonly providerRepository: Repository<Provider>,
  ) {}

  async createProvider(dto: CreateProviderDto): Promise<Provider> {
    const provider = this.providerRepository.create(dto);
    return await this.providerRepository.save(provider);
  }

  async updateProvider(id: number, dto: UpdateProviderDto): Promise<Provider> {
    const provider = await this.findProviderById(id);
    Object.assign(provider, dto);
    return await this.providerRepository.save(provider);
  }
 
  async findAllProviders(): Promise<Provider[]> {
    return await this.providerRepository.find({
      where: { deletedAt: null },
      order: { createdAt: 'DESC' }, // opcional: los más recientes primero

    });
  }

  async findProviderById(id: number): Promise<Provider> {
    const provider = await this.providerRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!provider) {
      throw new NotFoundException('Proveedor no encontrado');
    }

    return provider;
  }

  async softDeleteProvider(id: number): Promise<void> {
    const result = await this.providerRepository.softDelete(id);
    if (result.affected === 0) {
      throw new NotFoundException('No se pudo eliminar el proveedor');
    }
  }

  health(): string {
    return '🟢 Provider service is running';
  }
}
