import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AboutUsContent } from './entities/about-us-content.entity';
import { AboutUsContentService } from './about-us-content.service';
import { AboutUsContentController } from './about-us-content.controller';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([AboutUsContent]),
    TranslationModule,
  ],
  controllers: [AboutUsContentController],
  providers: [AboutUsContentService],
  exports: [AboutUsContentService],
})
export class AboutUsContentModule {}
