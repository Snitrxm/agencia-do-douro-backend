import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PropertiesController } from './properties.controller';
import { PropertiesService } from './properties.service';
import { Property } from './entities/property.entity';
import { PropertyImageSection } from './entities/property-image-section.entity';
import { PropertyFile } from './entities/property-file.entity';
import { PropertyFraction } from './entities/property-fraction.entity';
import { PropertyFractionColumn } from './entities/property-fraction-column.entity';
import { PropertyResponsible } from './entities/property-responsible.entity';
import { User } from '../users/entities/user.entity';
import { UploadModule } from '../upload/upload.module';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Property,
      PropertyImageSection,
      PropertyFile,
      PropertyFraction,
      PropertyFractionColumn,
      PropertyResponsible,
      User,
    ]),
    UploadModule,
    TranslationModule,
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService],
  exports: [PropertiesService],
})
export class PropertiesModule {}
