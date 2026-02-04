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
import { PodcastWhyListenService } from './podcast-why-listen.service';
import { CreatePodcastWhyListenCardDto } from './dto/create-podcast-why-listen-card.dto';
import { UpdatePodcastWhyListenCardDto } from './dto/update-podcast-why-listen-card.dto';

@Controller('podcast-why-listen')
export class PodcastWhyListenController {
  constructor(private readonly podcastWhyListenService: PodcastWhyListenService) {}

  @Post()
  create(@Body() createDto: CreatePodcastWhyListenCardDto) {
    return this.podcastWhyListenService.create(createDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    if (lang) {
      return this.podcastWhyListenService.findAllByLocale(lang);
    }
    return this.podcastWhyListenService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastWhyListenService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePodcastWhyListenCardDto) {
    return this.podcastWhyListenService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.podcastWhyListenService.remove(id);
  }
}
