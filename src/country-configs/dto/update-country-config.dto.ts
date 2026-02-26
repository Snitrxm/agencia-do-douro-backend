import { IsString, IsOptional, MaxLength, IsInt, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateCountryConfigDto {
  @IsString()
  @IsOptional()
  @MaxLength(100)
  label?: string;

  @Type(() => Number)
  @IsInt()
  @IsOptional()
  @Min(0)
  displayOrder?: number;
}
