import {
  IsString,
  IsNotEmpty,
  MaxLength,
  IsOptional,
  IsInt,
  Min,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateCountryConfigDto {
  @IsString()
  @IsNotEmpty({ message: 'O código do país é obrigatório' })
  @Length(2, 2, { message: 'O código do país deve ter exatamente 2 caracteres' })
  code: string;

  @IsString()
  @IsNotEmpty({ message: 'O nome do país é obrigatório' })
  @MaxLength(100, { message: 'O nome deve ter no máximo 100 caracteres' })
  label: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  displayOrder?: number;
}
