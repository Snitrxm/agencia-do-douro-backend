import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CultureItem } from './entities/culture-item.entity';
import { CultureItemsService } from './culture-items.service';
import { CultureItemsController } from './culture-items.controller';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CultureItem]),
    TranslationModule,
  ],
  controllers: [CultureItemsController],
  providers: [CultureItemsService],
  exports: [CultureItemsService],
})
export class CultureItemsModule {}
