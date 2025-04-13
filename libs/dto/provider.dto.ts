import {
    IsEmail,
    IsNotEmpty,
    IsOptional,
    IsString,
    IsIn,
  } from 'class-validator';
  
  // 🔁 Opciones permitidas
  export const PROVIDER_TYPES = [
    'fuel',
    'maintenance',
    'parts',
    'repair',
    'supplies',
    'misc',
    'other',
  ] as const;
  
  export type ProviderType = (typeof PROVIDER_TYPES)[number];
  
  export class CreateProviderDto {
    @IsNotEmpty({ message: 'El nombre es obligatorio' })
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name: string;
  

    @IsString({ message: 'El identificador debe ser una cadena de texto' })
    @IsOptional()
    identifier: string;
  
    @IsNotEmpty({ message: 'El tipo de proveedor es obligatorio' })
    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @IsIn(PROVIDER_TYPES, {
      message: `El tipo debe ser uno de: ${PROVIDER_TYPES.join(', ')}`,
    })
    type: ProviderType;
  
    @IsOptional()
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    phone: string;
  
    @IsOptional()
    email?: string;
  
    @IsOptional()
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    address: string;
  
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    notes?: string;
  }
  
  export class UpdateProviderDto {
    @IsOptional()
    @IsString({ message: 'El nombre debe ser una cadena de texto' })
    name?: string;
  
    @IsOptional()
    @IsString({ message: 'El identificador debe ser una cadena de texto' })
    identifier?: string;
  
    @IsOptional()
    @IsString({ message: 'El tipo debe ser una cadena de texto' })
    @IsIn(PROVIDER_TYPES, {
      message: `El tipo debe ser uno de: ${PROVIDER_TYPES.join(', ')}`,
    })
    type?: ProviderType;
  
    @IsOptional()
    @IsString({ message: 'El teléfono debe ser una cadena de texto' })
    phone?: string;
  
    @IsOptional()
    email?: string;
  
    @IsOptional()
    @IsString({ message: 'La dirección debe ser una cadena de texto' })
    address?: string;
  
    @IsOptional()
    @IsString({ message: 'Las observaciones deben ser texto' })
    notes?: string;
  }
  
  export class FindProviderByIdDto {
    @IsNotEmpty({ message: 'El ID del proveedor es obligatorio' })
    id: number;
  }
  

  export const providerTypeOptions = [
    { id: "fuel", name: "Combustible" },
    { id: "maintenance", name: "Mantenimiento" },
    { id: "parts", name: "Repuestos" },
    { id: "repair", name: "Reparación" },
    { id: "supplies", name: "Insumos" },
    { id: "misc", name: "Varios" },
    { id: "other", name: "Otro" },
  ];
  