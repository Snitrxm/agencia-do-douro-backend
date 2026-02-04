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

export class CreatePodcastTestimonialDto {
  @IsString({ message: 'O nome deve ser uma string' })
  @IsNotEmpty({ message: 'O nome é obrigatório' })
  @MaxLength(255, { message: 'O nome deve ter no máximo 255 caracteres' })
  name: string;

  @IsString({ message: 'A função em português deve ser uma string' })
  @IsNotEmpty({ message: 'A função em português é obrigatória' })
  @MaxLength(255, { message: 'A função deve ter no máximo 255 caracteres' })
  role_pt: string;

  @IsString({ message: 'O texto em português deve ser uma string' })
  @IsNotEmpty({ message: 'O texto em português é obrigatório' })
  @MinLength(10, { message: 'O texto deve ter no mínimo 10 caracteres' })
  text_pt: string;

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
