import {
  IsString,
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsOptional,
  IsArray,
  IsUUID,
} from 'class-validator';

export class CreateNewsletterDto {
  @IsString({ message: 'O título deve ser uma string' })
  @IsNotEmpty({ message: 'O título é obrigatório' })
  @MinLength(3, { message: 'O título deve ter no mínimo 3 caracteres' })
  @MaxLength(255, { message: 'O título deve ter no máximo 255 caracteres' })
  title: string;

  @IsString({ message: 'O conteúdo deve ser uma string' })
  @IsNotEmpty({ message: 'O conteúdo é obrigatório' })
  content: string;

  @IsString({ message: 'A categoria deve ser uma string' })
  @IsNotEmpty({ message: 'A categoria é obrigatória' })
  @MaxLength(100, { message: 'A categoria deve ter no máximo 100 caracteres' })
  category: string;

  @IsOptional()
  @IsString({ message: 'A imagem de capa deve ser uma string' })
  @MaxLength(500, {
    message: 'A URL da imagem deve ter no máximo 500 caracteres',
  })
  coverImage?: string;

  @IsOptional()
  @IsArray({ message: 'Os imóveis devem ser um array' })
  @IsUUID('4', {
    each: true,
    message: 'Cada ID de imóvel deve ser um UUID válido',
  })
  propertyIds?: string[];
}
