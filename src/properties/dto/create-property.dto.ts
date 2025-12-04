import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsNumber,
  IsEnum,
  IsOptional,
  Min,
  IsBoolean,
  IsArray,
  IsInt,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreatePropertyDto {
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  title: string;

  @IsString({ message: 'A descrição deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição é obrigatória' })
  description: string;

  @IsString({ message: 'O tipo de transação deve ser uma string' })
  @IsOptional()
  @IsEnum(['comprar', 'arrendar', 'vender'], {
    message: 'O tipo de transação deve ser: comprar, arrendar ou vender',
  })
  transactionType?: string;

  @IsString({ message: 'O tipo de imóvel deve ser uma string' })
  @IsNotEmpty({ message: 'O tipo de imóvel é obrigatório' })
  @MaxLength(100, {
    message: 'O tipo de imóvel deve ter no máximo 100 caracteres',
  })
  propertyType: string;

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
  @IsNotEmpty({ message: 'O preço é obrigatório' })
  @Min(0, { message: 'O preço deve ser maior ou igual a zero' })
  price: number;

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
  @IsNotEmpty({ message: 'O número de quartos é obrigatório' })
  @Min(0, { message: 'O número de quartos deve ser maior ou igual a zero' })
  bedrooms: number;

  @Type(() => Number)
  @IsInt({ message: 'O número de banheiros deve ser um número inteiro' })
  @IsNotEmpty({ message: 'O número de banheiros é obrigatório' })
  @Min(0, { message: 'O número de banheiros deve ser maior ou igual a zero' })
  bathrooms: number;

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
  @IsNotEmpty({ message: 'O distrito é obrigatório' })
  @MaxLength(100, { message: 'O distrito deve ter no máximo 100 caracteres' })
  distrito: string;

  @IsString({ message: 'O concelho deve ser uma string' })
  @IsNotEmpty({ message: 'O concelho é obrigatório' })
  @MaxLength(100, { message: 'O concelho deve ter no máximo 100 caracteres' })
  concelho: string;

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

  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return [];
  })
  @IsArray({ message: 'As imagens devem ser um array' })
  @IsString({ each: true, message: 'Cada imagem deve ser uma string (URL)' })
  @IsOptional()
  images?: string[];

  @IsString({ message: 'As condições de pagamento devem ser uma string' })
  @IsOptional()
  paymentConditions?: string;

  @Transform(({ value }) => {
    if (!value) return [];
    if (Array.isArray(value)) return value;
    if (typeof value === 'string') {
      try {
        return JSON.parse(value);
      } catch {
        return [value];
      }
    }
    return [];
  })
  @IsArray({ message: 'As características devem ser um array' })
  @IsString({
    each: true,
    message: 'Cada característica deve ser uma string',
  })
  @IsOptional()
  features?: string[];

  @IsString({ message: 'O status deve ser uma string' })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'sold', 'rented'], {
    message: 'O status deve ser: active, inactive, sold ou rented',
  })
  status?: string;
}
