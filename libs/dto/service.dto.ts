// service.dto.ts

import { IsEnum, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { ExecutionType, ServiceType } from '../entities/service.entity';

// DTO para un solo item
export class CreateItemDto {
  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsInt()
  quantity: number;

  @IsInt()
  unitPrice: number;

  @IsOptional()
  providerId?: number;
}

// DTO para creación de servicio + ítems
export class CreateServiceDto {
    @IsNotEmpty()
  vehicleId: number;

  @IsInt()
  mileage: number;

  @IsString()
  description: string;

  @IsEnum(ServiceType)
  type: ServiceType;

  @IsEnum(ExecutionType)
  performedBy: ExecutionType;

  @IsOptional()

  providerId?: number;

  @IsOptional()
  @IsInt()
  cost?: number;

    @IsOptional()
  userId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items: CreateItemDto[];
}

// DTO para actualización de servicio (puede excluir items si no se tocan)
export class UpdateServiceDto {
  @IsOptional()
  @IsInt()
  mileage?: number;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsEnum(ServiceType)
  type?: ServiceType;

  @IsOptional()
  @IsEnum(ExecutionType)
  performedBy?: ExecutionType;

  @IsOptional()
  providerId?: number;

  @IsOptional()
  @IsInt()
  cost?: number;

  @IsOptional()
  updatedById?: number;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateItemDto)
  items?: CreateItemDto[];
}
