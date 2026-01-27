import { IsNumber, IsOptional, Min, Max, IsString } from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class UpdateSiteConfigDto {
  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  clientesSatisfeitos?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  @Max(5)
  rating?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  anosExperiencia?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  imoveisVendidos?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  episodiosPublicados?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  temporadas?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  especialistasConvidados?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  eurosEmTransacoes?: number;

  @IsOptional()
  @Transform(({ value }) => value === '' || value === null || value === undefined ? undefined : Number(value))
  @IsNumber()
  @Min(0)
  seguidoresInstagram?: number;

  @IsOptional()
  @IsString()
  apresentadoraImage?: string;

  @IsOptional()
  @IsString()
  podcastImagem?: string;
}
