import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
} from '@nestjs/common';
import { PodcastGalleryService } from './podcast-gallery.service';
import { CreatePodcastGalleryImageDto } from './dto/create-podcast-gallery-image.dto';
import { UpdatePodcastGalleryImageDto } from './dto/update-podcast-gallery-image.dto';

@Controller('podcast-gallery')
export class PodcastGalleryController {
  constructor(private readonly podcastGalleryService: PodcastGalleryService) {}

  @Post()
  create(@Body() createDto: CreatePodcastGalleryImageDto) {
    return this.podcastGalleryService.create(createDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    if (lang) {
      return this.podcastGalleryService.findAllByLocale(lang);
    }
    return this.podcastGalleryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastGalleryService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePodcastGalleryImageDto) {
    return this.podcastGalleryService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.podcastGalleryService.remove(id);
  }
}
