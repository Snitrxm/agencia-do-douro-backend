import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePodcastWhyListenCardDto {
  @IsString({ message: 'A chave do ícone deve ser uma string' })
  @IsNotEmpty({ message: 'A chave do ícone é obrigatória' })
  @MaxLength(100, { message: 'A chave do ícone deve ter no máximo 100 caracteres' })
  iconKey: string;

  @IsString({ message: 'O título em português deve ser uma string' })
  @IsNotEmpty({ message: 'O título em português é obrigatório' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  title_pt: string;

  @IsString({ message: 'O subtexto em português deve ser uma string' })
  @IsNotEmpty({ message: 'O subtexto em português é obrigatório' })
  @MinLength(10, { message: 'O subtexto deve ter no mínimo 10 caracteres' })
  subtext_pt: string;

  @Type(() => Number)
  @IsInt({ message: 'A ordem deve ser um número inteiro' })
  @IsOptional()
  @Min(0, { message: 'A ordem deve ser maior ou igual a zero' })
  order?: number;

  @Type(() => Boolean)
  @IsBoolean({ message: 'isActive deve ser um booleano' })
  @IsOptional()
  isActive?: boolean;
}
