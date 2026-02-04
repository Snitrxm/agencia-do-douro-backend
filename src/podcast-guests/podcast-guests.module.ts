import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PodcastGuestsService } from './podcast-guests.service';
import { PodcastGuestsController } from './podcast-guests.controller';
import { PodcastGuest } from './entities/podcast-guest.entity';
import { TranslationModule } from '../translation/translation.module';

@Module({
  imports: [TypeOrmModule.forFeature([PodcastGuest]), TranslationModule],
  controllers: [PodcastGuestsController],
  providers: [PodcastGuestsService],
  exports: [PodcastGuestsService],
})
export class PodcastGuestsModule {}
