import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SellPropertyContent } from './entities/sell-property-content.entity';
import { SellPropertyContentService } from './sell-property-content.service';
import { SellPropertyContentController } from './sell-property-content.controller';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([SellPropertyContent]),
    TranslationModule,
  ],
  controllers: [SellPropertyContentController],
  providers: [SellPropertyContentService],
  exports: [SellPropertyContentService],
})
export class SellPropertyContentModule {}
