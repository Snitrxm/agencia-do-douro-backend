import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastContent } from './entities/podcast-content.entity';
import { PodcastContentService } from './podcast-content.service';
import { PodcastContentController } from './podcast-content.controller';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([PodcastContent]),
    TranslationModule,
  ],
  controllers: [PodcastContentController],
  providers: [PodcastContentService],
  exports: [PodcastContentService],
})
export class PodcastContentModule {}
