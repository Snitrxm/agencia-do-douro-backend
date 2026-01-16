import {
  IsString,
  MaxLength,
  IsOptional,
  IsBoolean,
  IsInt,
  Min,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateDesiredZoneDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsOptional()
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  name?: string;

  @IsString({ message: 'A imagem deve ser uma string' })
  @IsOptional()
  image?: string;

  @Type(() => Number)
  @IsInt({ message: 'A ordem deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem deve ser maior ou igual a zero' })
  displayOrder?: number;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'O campo ativo deve ser verdadeiro ou falso' })
  @IsOptional()
  isActive?: boolean;

  @IsString({ message: 'O país deve ser uma string' })
  @IsOptional()
  @MaxLength(2, { message: 'O código do país deve ter no máximo 2 caracteres' })
  country?: string;
}
