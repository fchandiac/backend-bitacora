import { IsNotEmpty, IsOptional, IsString, IsInt } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateVehicleDto {
  @IsNotEmpty({ message: 'La patente es obligatoria' })
  @IsString({ message: 'La patente debe ser una cadena de texto' })
  plate: string;

  @IsOptional()
  @IsString({ message: 'El número de motor debe ser una cadena de texto' })
  engineNumber?: string;

  @IsOptional()
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  brand?: string;

  @IsOptional()
  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  model?: string;

  @IsNotEmpty({ message: 'El año es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El año debe ser un número' })
  year: number;

  @IsNotEmpty({ message: 'El nombre interno es obligatorio' })
  @IsString({ message: 'El nombre interno debe ser una cadena de texto' })
  name: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  notes?: string;
}

export class UpdateVehicleDto {
  @IsOptional()
  @IsString({ message: 'La patente debe ser una cadena de texto' })
  plate?: string;

  @IsOptional()
  @IsString({ message: 'El número de motor debe ser una cadena de texto' })
  engineNumber?: string;

  @IsOptional()
  @IsString({ message: 'La marca debe ser una cadena de texto' })
  brand?: string;

  @IsOptional()
  @IsString({ message: 'El modelo debe ser una cadena de texto' })
  model?: string;

  @IsOptional()
  @Type(() => Number)
  @IsInt({ message: 'El año debe ser un número' })
  year?: number;

  @IsOptional()
  @IsString({ message: 'El nombre interno debe ser una cadena de texto' })
  name?: string;

  @IsOptional()
  @IsString({ message: 'Las observaciones deben ser texto' })
  notes?: string;
}

export class FindVehicleByIdDto {
  @IsNotEmpty({ message: 'El ID del vehículo es obligatorio' })
  @Type(() => Number)
  @IsInt({ message: 'El ID debe ser un número entero' })
  id: number;
}
