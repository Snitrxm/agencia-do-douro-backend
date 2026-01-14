import { IsString, IsNotEmpty, MinLength, MaxLength, IsNumber, IsOptional, Min } from 'class-validator';

export class CreateCultureItemDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(255)
  title_pt: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  description_pt: string;

  @IsOptional()
  @IsNumber()
  @Min(0)
  order?: number;
}
