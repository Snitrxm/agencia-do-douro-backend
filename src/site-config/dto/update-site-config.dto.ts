import { IsNumber, IsOptional, Min, Max, IsString } from 'class-validator';

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

  @IsOptional()
  @IsNumber()
  @Min(0)
  episodiosPublicados?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  temporadas?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  especialistasConvidados?: number;

  @IsOptional()
  @IsNumber()
  @Min(0)
  eurosEmTransacoes?: number;

  @IsOptional()
  @IsString()
  apresentadoraImage?: string;
}
