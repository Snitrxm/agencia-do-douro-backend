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
} from '@nestjs/common';
import { PodcastTopicsService } from './podcast-topics.service';
import { CreatePodcastTopicDto } from './dto/create-podcast-topic.dto';
import { UpdatePodcastTopicDto } from './dto/update-podcast-topic.dto';

@Controller('podcast-topics')
export class PodcastTopicsController {
  constructor(private readonly podcastTopicsService: PodcastTopicsService) {}

  @Post()
  create(@Body() createPodcastTopicDto: CreatePodcastTopicDto) {
    return this.podcastTopicsService.create(createPodcastTopicDto);
  }

  @Get()
  findAll() {
    return this.podcastTopicsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastTopicsService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePodcastTopicDto: UpdatePodcastTopicDto,
  ) {
    return this.podcastTopicsService.update(id, updatePodcastTopicDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.podcastTopicsService.remove(id);
  }
}
