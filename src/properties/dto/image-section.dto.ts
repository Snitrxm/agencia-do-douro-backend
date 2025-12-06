import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsOptional,
  IsInt,
  Min,
  MaxLength,
} from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class ImageSectionDto {
  @IsString({ message: 'O ID da seção deve ser uma string' })
  @IsOptional()
  id?: string;

  @IsString({ message: 'O nome da seção deve ser uma string' })
  @IsNotEmpty({ message: 'O nome da seção é obrigatório' })
  @MaxLength(100, {
    message: 'O nome da seção deve ter no máximo 100 caracteres',
  })
  sectionName: string;

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
  images: string[];

  @Type(() => Number)
  @IsInt({ message: 'A ordem de exibição deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem de exibição deve ser maior ou igual a zero' })
  displayOrder?: number;
}

export class CreateImageSectionDto {
  @IsString({ message: 'O nome da seção deve ser uma string' })
  @IsNotEmpty({ message: 'O nome da seção é obrigatório' })
  @MaxLength(100, {
    message: 'O nome da seção deve ter no máximo 100 caracteres',
  })
  sectionName: string;

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

  @Type(() => Number)
  @IsInt({ message: 'A ordem de exibição deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem de exibição deve ser maior ou igual a zero' })
  displayOrder?: number;
}

export class UpdateImageSectionDto {
  @IsString({ message: 'O nome da seção deve ser uma string' })
  @IsOptional()
  @MaxLength(100, {
    message: 'O nome da seção deve ter no máximo 100 caracteres',
  })
  sectionName?: string;

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
  @IsArray({ message: 'As imagens a remover devem ser um array' })
  @IsString({
    each: true,
    message: 'Cada imagem a remover deve ser uma string (URL)',
  })
  @IsOptional()
  imagesToRemove?: string[];

  @Type(() => Number)
  @IsInt({ message: 'A ordem de exibição deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem de exibição deve ser maior ou igual a zero' })
  displayOrder?: number;
}
