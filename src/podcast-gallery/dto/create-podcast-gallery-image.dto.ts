import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsInt,
  IsBoolean,
  IsIn,
  Min,
  MaxLength,
  ValidateIf,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreatePodcastGalleryImageDto {
  @IsOptional()
  @IsIn(['image', 'video'], { message: 'O tipo de mídia deve ser "image" ou "video"' })
  mediaType?: 'image' | 'video';

  @ValidateIf((o) => o.mediaType !== 'video')
  @IsString({ message: 'A URL da imagem deve ser uma string' })
  @IsNotEmpty({ message: 'A URL da imagem é obrigatória' })
  @MaxLength(500, { message: 'A URL deve ter no máximo 500 caracteres' })
  imageUrl?: string;

  @ValidateIf((o) => o.mediaType === 'video')
  @IsString({ message: 'A URL do vídeo deve ser uma string' })
  @IsNotEmpty({ message: 'A URL do vídeo é obrigatória para mídia do tipo video' })
  @MaxLength(500, { message: 'A URL do vídeo deve ter no máximo 500 caracteres' })
  videoUrl?: string;

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
