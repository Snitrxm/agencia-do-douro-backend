import { PartialType } from '@nestjs/mapped-types';
import { CreateCultureItemDto } from './create-culture-item.dto';

export class UpdateCultureItemDto extends PartialType(CreateCultureItemDto) {}
