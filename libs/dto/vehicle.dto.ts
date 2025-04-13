import {
    IsNotEmpty,
    IsOptional,
    IsString,
    IsInt,
    Min,
    Max,
  } from 'class-validator';
  
  export class CreateVehicleDto {
    @IsNotEmpty({ message: 'La patente es obligatoria' })
    @IsString({ message: 'La patente debe ser una cadena de texto' })
    plate: string;
  
    @IsNotEmpty({ message: 'El número de motor es obligatorio' })
    @IsString({ message: 'El número de motor debe ser una cadena de texto' })
    engineNumber: string;
  
    @IsNotEmpty({ message: 'La marca es obligatoria' })
    @IsString({ message: 'La marca debe ser una cadena de texto' })
    brand: string;
  
    @IsNotEmpty({ message: 'El modelo es obligatorio' })
    @IsString({ message: 'El modelo debe ser una cadena de texto' })
    model: string;
  
    @IsInt({ message: 'El año debe ser un número' })
    @Min(1900, { message: 'El año debe ser mayor o igual a 1900' })
    @Max(new Date().getFullYear(), { message: 'El año no puede ser mayor al actual' })
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
    @IsInt({ message: 'El ID debe ser un número entero' })
    id: number;
  }
  