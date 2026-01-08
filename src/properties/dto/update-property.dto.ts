import {
  IsString,
  MinLength,
  MaxLength,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  IsBoolean,
  IsArray,
  IsInt,
  ValidateNested,
  IsUUID,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';
import { ImageSectionDto } from './image-section.dto';

export class UpdatePropertyDto {
  @IsString()
  id: string;

  @IsString({ message: 'A referência deve ser uma string' })
  @IsOptional()
  @MaxLength(50, { message: 'A referência deve ter no máximo 50 caracteres' })
  reference?: string;

  // Portuguese fields (admin writes only in PT, translations are auto-generated)
  @IsString({ message: 'O título em português deve ser uma string' })
  @IsOptional()
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  title_pt?: string;

  @IsString({ message: 'A descrição em português deve ser uma string' })
  @IsOptional()
  description_pt?: string;

  @IsString({ message: 'O tipo de transação deve ser uma string' })
  @IsOptional()
  @IsEnum(['comprar', 'arrendar', 'trespasse'], {
    message: 'O tipo de transação deve ser: comprar, arrendar ou trespasse',
  })
  transactionType?: string;

  @IsString({ message: 'O tipo de imóvel deve ser uma string' })
  @IsOptional()
  @MaxLength(100, {
    message: 'O tipo de imóvel deve ter no máximo 100 caracteres',
  })
  propertyType?: string;

  @IsString()
  @IsOptional()
  teamMemberId?: string;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'O campo empreendimento deve ser verdadeiro ou falso' })
  @IsOptional()
  isEmpreendimento?: boolean;

  @IsString({ message: 'O estado do imóvel deve ser uma string' })
  @IsOptional()
  @IsEnum(['novo', 'usado', 'renovado'], {
    message: 'O estado do imóvel deve ser: novo, usado ou renovado',
  })
  propertyState?: string;

  @IsString({ message: 'A classe energética deve ser uma string' })
  @IsOptional()
  @MaxLength(10, {
    message: 'A classe energética deve ter no máximo 10 caracteres',
  })
  energyClass?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'O preço deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'O preço deve ser maior ou igual a zero' })
  price?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'A área total deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'A área total deve ser maior ou igual a zero' })
  totalArea?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'A área construída deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'A área construída deve ser maior ou igual a zero' })
  builtArea?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'A área útil deve ser um número' })
  @IsOptional()
  @Min(0, { message: 'A área útil deve ser maior ou igual a zero' })
  usefulArea?: number;

  @Type(() => Number)
  @IsInt({ message: 'O número de quartos deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'O número de quartos deve ser maior ou igual a zero' })
  bedrooms?: number;

  @Type(() => Number)
  @IsInt({ message: 'O número de banheiros deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'O número de banheiros deve ser maior ou igual a zero' })
  bathrooms?: number;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'O campo escritório deve ser verdadeiro ou falso' })
  @IsOptional()
  hasOffice?: boolean;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'O campo lavandaria deve ser verdadeiro ou falso' })
  @IsOptional()
  hasLaundry?: boolean;

  @Type(() => Number)
  @IsInt({ message: 'O número de vagas de garagem deve ser um número inteiro' })
  @IsOptional()
  @Min(0, {
    message: 'O número de vagas de garagem deve ser maior ou igual a zero',
  })
  garageSpaces?: number;

  @Type(() => Number)
  @IsInt({ message: 'O ano de construção deve ser um número inteiro' })
  @IsOptional()
  @Min(1800, { message: 'O ano de construção deve ser maior que 1800' })
  constructionYear?: number;

  @IsString({ message: 'A data de entrega deve ser uma string' })
  @IsOptional()
  @MaxLength(255, {
    message: 'A data de entrega deve ter no máximo 255 caracteres',
  })
  deliveryDate?: string;

  @IsString({ message: 'O distrito deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'O distrito deve ter no máximo 100 caracteres' })
  distrito?: string;

  @IsString({ message: 'O concelho deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'O concelho deve ter no máximo 100 caracteres' })
  concelho?: string;

  @IsString({ message: 'A freguesia deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'A freguesia deve ter no máximo 100 caracteres' })
  freguesia?: string;

  @IsString({ message: 'O endereço deve ser uma string' })
  @IsOptional()
  @MaxLength(255, { message: 'O endereço deve ter no máximo 255 caracteres' })
  address?: string;

  @Type(() => Number)
  @IsNumber({}, { message: 'A latitude deve ser um número' })
  @IsOptional()
  latitude?: number;

  @Type(() => Number)
  @IsNumber({}, { message: 'A longitude deve ser um número' })
  @IsOptional()
  longitude?: number;

  @IsString({ message: 'A imagem principal deve ser uma string (URL)' })
  @IsOptional()
  image?: string;

  @IsString({ message: 'As condições de pagamento em português devem ser uma string' })
  @IsOptional()
  paymentConditions_pt?: string;

  @IsString({ message: 'O status deve ser uma string' })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'sold', 'rented', 'reserved'], {
    message: 'O status deve ser: active, inactive, reserved, sold ou rented',
  })
  status?: string;

  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return [];
  })
  @IsArray({ message: 'As seções de imagens devem ser um array' })
  @ValidateNested({ each: true })
  @Type(() => ImageSectionDto)
  @IsOptional()
  imageSections?: ImageSectionDto[];

  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [];
      }
    }
    return [];
  })
  @IsArray({ message: 'IDs das propriedades relacionadas devem ser um array' })
  @IsUUID('4', {
    each: true,
    message: 'Cada ID de propriedade relacionada deve ser um UUID válido',
  })
  @IsOptional()
  relatedPropertyIds?: string[];
}
