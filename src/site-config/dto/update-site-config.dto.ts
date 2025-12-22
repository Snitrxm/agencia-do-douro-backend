import { IsNumber, IsOptional, Min, Max } from 'class-validator';

export class UpdateSiteConfigDto {
  @IsOptional()
  @IsNumber()
  @Min(0)
  clientesSatisfeitos?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @IsNumber()
  anosExperiencia?: number;

  @IsOptional()
  @IsNumber()
  imoveisVendidos?: number;
}
