import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  Min,
  MaxLength,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePodcastGalleryImageDto {
  @IsString({ message: 'A URL da imagem deve ser uma string' })
  @IsNotEmpty({ message: 'A URL da imagem é obrigatória' })
  @MaxLength(500, { message: 'A URL deve ter no máximo 500 caracteres' })
  imageUrl: string;

  @IsOptional()
  @IsString({ message: 'O alt em português deve ser uma string' })
  @MaxLength(255, { message: 'O alt deve ter no máximo 255 caracteres' })
  alt_pt?: string;

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
