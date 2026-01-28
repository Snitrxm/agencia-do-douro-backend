import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsObject,
  IsArray,
  ValidateNested,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePropertyFractionDto {
  // Campos multilíngues - Natureza
  @IsOptional()
  @IsString()
  nature_pt?: string;

  @IsOptional()
  @IsString()
  nature_en?: string;

  @IsOptional()
  @IsString()
  nature_fr?: string;

  // Campos multilíngues - Tipologia
  @IsOptional()
  @IsString()
  fractionType_pt?: string;

  @IsOptional()
  @IsString()
  fractionType_en?: string;

  @IsOptional()
  @IsString()
  fractionType_fr?: string;

  // Campos multilíngues - Piso
  @IsOptional()
  @IsString()
  floor_pt?: string;

  @IsOptional()
  @IsString()
  floor_en?: string;

  @IsOptional()
  @IsString()
  floor_fr?: string;

  // Campos multilíngues - Fração/Unidade
  @IsOptional()
  @IsString()
  unit_pt?: string;

  @IsOptional()
  @IsString()
  unit_en?: string;

  @IsOptional()
  @IsString()
  unit_fr?: string;

  // Campos numéricos
  @IsOptional()
  @IsNumber()
  @Min(0)
  grossArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  outdoorArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  parkingSpaces?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  // Campo URL - Link para PDF da planta
  @IsOptional()
  @IsString()
  floorPlan?: string;

  // Status de reserva
  @IsOptional()
  @IsEnum(['available', 'reserved', 'sold'])
  reservationStatus?: string;

  // Ordem de exibição
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  // Dados personalizados para colunas customizadas
  @IsOptional()
  @IsObject()
  customData?: Record<string, any>;
}

export class UpdatePropertyFractionDto {
  // Campos multilíngues - Natureza
  @IsOptional()
  @IsString()
  nature_pt?: string;

  @IsOptional()
  @IsString()
  nature_en?: string;

  @IsOptional()
  @IsString()
  nature_fr?: string;

  // Campos multilíngues - Tipologia
  @IsOptional()
  @IsString()
  fractionType_pt?: string;

  @IsOptional()
  @IsString()
  fractionType_en?: string;

  @IsOptional()
  @IsString()
  fractionType_fr?: string;

  // Campos multilíngues - Piso
  @IsOptional()
  @IsString()
  floor_pt?: string;

  @IsOptional()
  @IsString()
  floor_en?: string;

  @IsOptional()
  @IsString()
  floor_fr?: string;

  // Campos multilíngues - Fração/Unidade
  @IsOptional()
  @IsString()
  unit_pt?: string;

  @IsOptional()
  @IsString()
  unit_en?: string;

  @IsOptional()
  @IsString()
  unit_fr?: string;

  // Campos numéricos
  @IsOptional()
  @IsNumber()
  @Min(0)
  grossArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  outdoorArea?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  parkingSpaces?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  price?: number;

  // Campo URL - Link para PDF da planta
  @IsOptional()
  @IsString()
  floorPlan?: string;

  // Status de reserva
  @IsOptional()
  @IsEnum(['available', 'reserved', 'sold'])
  reservationStatus?: string;

  // Ordem de exibição
  @IsOptional()
  @IsNumber()
  displayOrder?: number;

  // Dados personalizados para colunas customizadas
  @IsOptional()
  @IsObject()
  customData?: Record<string, any>;
}

export class BulkCreateFractionsDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePropertyFractionDto)
  fractions: CreatePropertyFractionDto[];
}
