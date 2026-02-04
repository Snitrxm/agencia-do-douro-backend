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
import { PodcastGuestsService } from './podcast-guests.service';
import { CreatePodcastGuestDto } from './dto/create-podcast-guest.dto';
import { UpdatePodcastGuestDto } from './dto/update-podcast-guest.dto';

@Controller('podcast-guests')
export class PodcastGuestsController {
  constructor(private readonly podcastGuestsService: PodcastGuestsService) {}

  @Post()
  create(@Body() createDto: CreatePodcastGuestDto) {
    return this.podcastGuestsService.create(createDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    if (lang) {
      return this.podcastGuestsService.findAllByLocale(lang);
    }
    return this.podcastGuestsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastGuestsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePodcastGuestDto) {
    return this.podcastGuestsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.podcastGuestsService.remove(id);
  }
}
