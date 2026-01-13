import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastTopicsService } from './podcast-topics.service';
import { PodcastTopicsController } from './podcast-topics.controller';
import { PodcastTopic } from './entities/podcast-topic.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastTopic]), TranslationModule],
  controllers: [PodcastTopicsController],
  providers: [PodcastTopicsService],
  exports: [PodcastTopicsService],
})
export class PodcastTopicsModule {}
