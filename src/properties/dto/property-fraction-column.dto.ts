import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsBoolean,
  IsArray,
  Min,
} from 'class-validator';

export class CreatePropertyFractionColumnDto {
  @IsString()
  columnKey: string;

  @IsString()
  label_pt: string;

  @IsOptional()
  @IsString()
  label_en?: string;

  @IsOptional()
  @IsString()
  label_fr?: string;

  @IsOptional()
  @IsEnum(['text', 'number', 'currency', 'area', 'select'])
  dataType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectOptions?: string[];

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;
}

export class UpdatePropertyFractionColumnDto {
  @IsOptional()
  @IsString()
  columnKey?: string;

  @IsOptional()
  @IsString()
  label_pt?: string;

  @IsOptional()
  @IsString()
  label_en?: string;

  @IsOptional()
  @IsString()
  label_fr?: string;

  @IsOptional()
  @IsEnum(['text', 'number', 'currency', 'area', 'select'])
  dataType?: string;

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  selectOptions?: string[];

  @IsOptional()
  @IsBoolean()
  isVisible?: boolean;

  @IsOptional()
  @IsBoolean()
  isRequired?: boolean;

  @IsOptional()
  @IsNumber()
  @Min(0)
  displayOrder?: number;
}
