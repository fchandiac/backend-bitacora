import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateFuelLoadDto {
  @IsInt()
  vehicleId: number;

  @IsInt()
  providerId: number;

  @IsString()
  @IsNotEmpty()
  invoiceNumber: string;

  @IsNumber()
  liters: number;

  @IsInt()
  totalPrice: number;

  @IsInt()
  userId: number;
}

export class UpdateFuelLoadDto {
  @IsOptional()
  @IsInt()
  vehicleId?: number;

  @IsOptional()
  @IsInt()
  providerId?: number;

  @IsOptional()
  @IsString()
  invoiceNumber?: string;

  @IsOptional()
  @IsNumber()
  liters?: number;

  @IsOptional()
  @IsInt()
  totalPrice?: number;

  @IsOptional()
  @IsInt()
  userId?: number;
}
