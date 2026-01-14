import { IsString, IsNotEmpty } from 'class-validator';

export class CreateDepoimentoDto {
  @IsString({ message: 'O nome do cliente deve ser uma string' })
  @IsNotEmpty({ message: 'O nome do cliente é obrigatório' })
  clientName: string;

  @IsString({ message: 'O texto deve ser uma string' })
  @IsNotEmpty({ message: 'O texto é obrigatório' })
  text_pt: string;
}
