import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastGalleryService } from './podcast-gallery.service';
import { PodcastGalleryController } from './podcast-gallery.controller';
import { PodcastGalleryImage } from './entities/podcast-gallery-image.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastGalleryImage]), TranslationModule],
  controllers: [PodcastGalleryController],
  providers: [PodcastGalleryService],
  exports: [PodcastGalleryService],
})
export class PodcastGalleryModule {}
