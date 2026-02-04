import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastTestimonialsService } from './podcast-testimonials.service';
import { PodcastTestimonialsController } from './podcast-testimonials.controller';
import { PodcastTestimonial } from './entities/podcast-testimonial.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastTestimonial]), TranslationModule],
  controllers: [PodcastTestimonialsController],
  providers: [PodcastTestimonialsService],
  exports: [PodcastTestimonialsService],
})
export class PodcastTestimonialsModule {}
