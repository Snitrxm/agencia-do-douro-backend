import { IsArray, IsUUID, ArrayMinSize } from 'class-validator';
import { Type } from 'class-transformer';

export class AddRelatedPropertiesDto {
  @IsArray({ message: 'IDs das propriedades relacionadas devem ser um array' })
  @ArrayMinSize(1, {
    message: 'Pelo menos uma propriedade relacionada deve ser fornecida',
  })
  @IsUUID('4', { each: true, message: 'Cada ID deve ser um UUID válido' })
  @Type(() => String)
  relatedPropertyIds: string[];
}

export class RemoveRelatedPropertiesDto {
  @IsArray({ message: 'IDs das propriedades relacionadas devem ser um array' })
  @ArrayMinSize(1, {
    message: 'Pelo menos uma propriedade relacionada deve ser fornecida',
  })
  @IsUUID('4', { each: true, message: 'Cada ID deve ser um UUID válido' })
  @Type(() => String)
  relatedPropertyIds: string[];
}

export class SetRelatedPropertiesDto {
  @IsArray({ message: 'IDs das propriedades relacionadas devem ser um array' })
  @IsUUID('4', { each: true, message: 'Cada ID deve ser um UUID válido' })
  @Type(() => String)
  relatedPropertyIds: string[];
}
