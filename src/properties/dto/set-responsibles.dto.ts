import {
  IsArray,
  ValidateNested,
  IsUUID,
  IsNumber,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ResponsibleItemDto {
  @IsUUID('4')
  userId: string;

  @IsNumber()
  @Min(0)
  @Max(100)
  commissionPercentage: number;
}

export class SetResponsiblesDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => ResponsibleItemDto)
  responsibles: ResponsibleItemDto[];
}
