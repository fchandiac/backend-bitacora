// src/users/users.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { User } from '../../libs/entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../../libs/dto/users.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(dto: CreateUserDto): Promise<User> {
    const exists = await this.userRepository.findOne({ where: { email: dto.email } });
    if (exists) {
      throw new BadRequestException('El correo ya está registrado');
    }

    const user = this.userRepository.create(dto);
    return await this.userRepository.save(user);
  }

  async updateUser(id: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.findUserById(id);
    Object.assign(user, dto);
    return await this.userRepository.save(user);
  }

  async updatePass(id: number, newPass: string): Promise<User> {
    const user = await this.findUserById(id);
    user.pass = newPass;
    return await this.userRepository.save(user);
  }

  async softDeleteUser(id: number): Promise<void> {
    const user = await this.findUserById(id);
    user.deletedAt = new Date();
    await this.userRepository.save(user);
  }

  async findAllUsers(): Promise<User[]> {
    return await this.userRepository.find({
      where: { deletedAt: IsNull() },
    });
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('Usuario no encontrado');
    }

    return user;
  }

  async findUserByEmail(email: string): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { email, deletedAt: IsNull() },
    });

    if (!user) {
      throw new NotFoundException('No se encontró un usuario con ese correo');
    }

    return user;
  }

  // Health check (puede ser llamado desde el controller para validar disponibilidad)
  health(): string {
    return '🟢 Users service is running';
  }
}
