import {
  IsString,
  IsOptional,
  IsNumber,
  IsEnum,
  Min,
  IsBoolean,
  IsInt,
  IsArray,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class FilterPropertyDto {
  // Filtros de preço
  @IsNumber({}, { message: 'O preço mínimo deve ser um número' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'O preço mínimo deve ser maior ou igual a zero' })
  minPrice?: number;

  @IsNumber({}, { message: 'O preço máximo deve ser um número' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'O preço máximo deve ser maior ou igual a zero' })
  maxPrice?: number;

  // Filtro de tipo de imóvel
  @IsString({ message: 'O tipo de imóvel deve ser uma string' })
  @IsOptional()
  propertyType?: string;

  // Filtro de tipo de transação
  @IsString({ message: 'O tipo de transação deve ser uma string' })
  @IsOptional()
  @IsEnum(['comprar', 'arrender', 'vender'], {
    message: 'O tipo de transação deve ser: comprar, arrender ou vender',
  })
  transactionType?: string;

  // Filtro de estado do imóvel
  @IsString({ message: 'O estado do imóvel deve ser uma string' })
  @IsOptional()
  @IsEnum(['novo', 'usado', 'renovado'], {
    message: 'O estado do imóvel deve ser: novo, usado ou renovado',
  })
  propertyState?: string;

  // Filtro de classe energética
  @IsString({ message: 'A classe energética deve ser uma string' })
  @IsOptional()
  energyClass?: string;

  // Filtro de status
  @IsString({ message: 'O status deve ser uma string' })
  @IsOptional()
  @IsEnum(['active', 'inactive', 'sold', 'rented'], {
    message: 'O status deve ser: active, inactive, sold ou rented',
  })
  status?: string;

  // Filtro de empreendimento
  @IsBoolean({
    message: 'O filtro de empreendimento deve ser verdadeiro ou falso',
  })
  @IsOptional()
  @Type(() => Boolean)
  isEmpreendimento?: boolean;

  // Filtros de localização
  @IsString({ message: 'O distrito deve ser uma string' })
  @IsOptional()
  distrito?: string;

  @IsString({ message: 'O concelho deve ser uma string' })
  @IsOptional()
  concelho?: string;

  // Filtros de área (área útil)
  @IsNumber({}, { message: 'A área mínima deve ser um número' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'A área mínima deve ser maior ou igual a zero' })
  minArea?: number;

  @IsNumber({}, { message: 'A área máxima deve ser um número' })
  @IsOptional()
  @Type(() => Number)
  @Min(0, { message: 'A área máxima deve ser maior ou igual a zero' })
  maxArea?: number;

  // Filtros de quartos (array de valores selecionados)
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v));
    }
    return value ? [parseInt(value)] : undefined;
  })
  @IsArray({ message: 'O filtro de quartos deve ser um array' })
  @IsInt({
    each: true,
    message: 'Cada valor de quartos deve ser um número inteiro',
  })
  bedrooms?: number[];

  // Filtros de banheiros (array de valores selecionados)
  @IsOptional()
  @Transform(({ value }) => {
    if (Array.isArray(value)) {
      return value.map((v) => parseInt(v));
    }
    return value ? [parseInt(value)] : undefined;
  })
  @IsArray({ message: 'O filtro de banheiros deve ser um array' })
  @IsInt({
    each: true,
    message: 'Cada valor de banheiros deve ser um número inteiro',
  })
  bathrooms?: number[];

  // Filtros de garagem
  @IsInt({
    message: 'O número mínimo de vagas de garagem deve ser um número inteiro',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0, {
    message:
      'O número mínimo de vagas de garagem deve ser maior ou igual a zero',
  })
  minGarageSpaces?: number;

  @IsInt({
    message: 'O número máximo de vagas de garagem deve ser um número inteiro',
  })
  @IsOptional()
  @Type(() => Number)
  @Min(0, {
    message:
      'O número máximo de vagas de garagem deve ser maior ou igual a zero',
  })
  maxGarageSpaces?: number;

  // Busca por texto
  @IsString({ message: 'O termo de busca deve ser uma string' })
  @IsOptional()
  search?: string;

  // Ordenação
  @IsString({ message: 'O campo de ordenação deve ser uma string' })
  @IsOptional()
  @IsEnum(
    [
      'price',
      'totalArea',
      'usefulArea',
      'createdAt',
      'bedrooms',
      'bathrooms',
      'garageSpaces',
      '-price',
      '-totalArea',
      '-usefulArea',
      '-createdAt',
      '-bedrooms',
      '-bathrooms',
      '-garageSpaces',
    ],
    {
      message:
        'O campo de ordenação deve ser: price, totalArea, usefulArea, createdAt, bedrooms, bathrooms, garageSpaces (use - para ordem decrescente)',
    },
  )
  sortBy?: string;

  // Paginação
  @IsInt({ message: 'A página deve ser um número inteiro' })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'A página deve ser maior ou igual a 1' })
  page?: number;

  @IsInt({ message: 'O limite deve ser um número inteiro' })
  @IsOptional()
  @Type(() => Number)
  @Min(1, { message: 'O limite deve ser maior ou igual a 1' })
  limit?: number;
}
