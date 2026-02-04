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
import { PodcastTestimonialsService } from './podcast-testimonials.service';
import { CreatePodcastTestimonialDto } from './dto/create-podcast-testimonial.dto';
import { UpdatePodcastTestimonialDto } from './dto/update-podcast-testimonial.dto';

@Controller('podcast-testimonials')
export class PodcastTestimonialsController {
  constructor(private readonly podcastTestimonialsService: PodcastTestimonialsService) {}

  @Post()
  create(@Body() createDto: CreatePodcastTestimonialDto) {
    return this.podcastTestimonialsService.create(createDto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    if (lang) {
      return this.podcastTestimonialsService.findAllByLocale(lang);
    }
    return this.podcastTestimonialsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.podcastTestimonialsService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDto: UpdatePodcastTestimonialDto) {
    return this.podcastTestimonialsService.update(id, updateDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.podcastTestimonialsService.remove(id);
  }
}
