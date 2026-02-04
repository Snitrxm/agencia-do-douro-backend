import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastWhyListenService } from './podcast-why-listen.service';
import { PodcastWhyListenController } from './podcast-why-listen.controller';
import { PodcastWhyListenCard } from './entities/podcast-why-listen-card.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastWhyListenCard]), TranslationModule],
  controllers: [PodcastWhyListenController],
  providers: [PodcastWhyListenService],
  exports: [PodcastWhyListenService],
})
export class PodcastWhyListenModule {}
