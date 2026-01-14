import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdateAboutUsContentDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageSubtitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description1_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  description2_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cultureLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  cultureTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  servicesLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  servicesTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  teamLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  teamTitle_pt?: string;

  @IsOptional()
  @IsString()
  teamDescription_pt?: string;
}
