import { Controller, Get, Patch, Body, Query } from '@nestjs/common';
import { PodcastContentService } from './podcast-content.service';
import { UpdatePodcastContentDto } from './dto/update-podcast-content.dto';

@Controller('podcast-content')
export class PodcastContentController {
  constructor(private readonly podcastContentService: PodcastContentService) {}

  @Get()
  async get(@Query('lang') lang?: string) {
    if (lang && ['pt', 'en', 'fr'].includes(lang)) {
      return this.podcastContentService.getByLocale(lang);
    }
    return this.podcastContentService.get();
  }

  @Patch()
  async update(@Body() updateDto: UpdatePodcastContentDto) {
    return this.podcastContentService.update(updateDto);
  }
}
