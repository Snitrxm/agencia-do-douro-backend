import { IsString, IsOptional } from 'class-validator';

export class UpdateDepoimentoDto {
  @IsString({ message: 'O nome do cliente deve ser uma string' })
  @IsOptional()
  clientName?: string;

  @IsString({ message: 'O texto deve ser uma string' })
  @IsOptional()
  text_pt?: string;
}
