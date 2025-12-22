import { IsString, IsOptional, IsBoolean, MaxLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class UpdatePropertyFileDto {
  @IsString({ message: 'O título deve ser uma string' })
  @IsOptional()
  @MaxLength(200, { message: 'O título deve ter no máximo 200 caracteres' })
  title?: string;

  @Transform(({ value }) => {
    if (value === 'true' || value === true) return true;
    if (value === 'false' || value === false) return false;
    return value;
  })
  @IsBoolean({ message: 'O campo visível deve ser verdadeiro ou falso' })
  @IsOptional()
  isVisible?: boolean;
}
