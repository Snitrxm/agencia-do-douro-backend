import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsInt,
  IsOptional,
  Min,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePodcastTopicDto {
  @IsString({ message: 'O título em português deve ser uma string' })
  @IsNotEmpty({ message: 'O título em português é obrigatório' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  title_pt: string;

  @IsString({ message: 'A descrição em português deve ser uma string' })
  @IsNotEmpty({ message: 'A descrição em português é obrigatória' })
  @MinLength(10, { message: 'A descrição deve ter no mínimo 10 caracteres' })
  description_pt: string;

  @Type(() => Number)
  @IsInt({ message: 'A ordem deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem deve ser maior ou igual a zero' })
  order?: number;
}
