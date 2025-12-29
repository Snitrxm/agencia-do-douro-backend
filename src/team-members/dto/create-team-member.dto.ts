import { IsEmail, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateTeamMemberDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(20)
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;
}
