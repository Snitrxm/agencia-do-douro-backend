import { IsString, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class AddressDto {
  @IsString({ message: 'A rua deve ser uma string' })
  @IsNotEmpty({ message: 'A rua é obrigatória' })
  @MaxLength(200, { message: 'A rua deve ter no máximo 200 caracteres' })
  street: string;

  @IsString({ message: 'O número deve ser uma string' })
  @IsNotEmpty({ message: 'O número é obrigatório' })
  @MaxLength(20, { message: 'O número deve ter no máximo 20 caracteres' })
  number: string;

  @IsString({ message: 'O complemento deve ser uma string' })
  @IsOptional()
  @MaxLength(100, {
    message: 'O complemento deve ter no máximo 100 caracteres',
  })
  complement?: string;

  @IsString({ message: 'O bairro deve ser uma string' })
  @IsNotEmpty({ message: 'O bairro é obrigatório' })
  @MaxLength(100, { message: 'O bairro deve ter no máximo 100 caracteres' })
  neighborhood: string;

  @IsString({ message: 'A cidade deve ser uma string' })
  @IsNotEmpty({ message: 'A cidade é obrigatória' })
  @MaxLength(100, { message: 'A cidade deve ter no máximo 100 caracteres' })
  city: string;

  @IsString({ message: 'O estado deve ser uma string' })
  @IsNotEmpty({ message: 'O estado é obrigatório' })
  @MaxLength(50, { message: 'O estado deve ter no máximo 50 caracteres' })
  state: string;

  @IsString({ message: 'O CEP deve ser uma string' })
  @IsNotEmpty({ message: 'O CEP é obrigatório' })
  @MaxLength(20, { message: 'O CEP deve ter no máximo 20 caracteres' })
  zipCode: string;

  @IsString({ message: 'O país deve ser uma string' })
  @IsOptional()
  @MaxLength(50, { message: 'O país deve ter no máximo 50 caracteres' })
  country?: string;
}
