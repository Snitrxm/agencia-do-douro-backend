import { Controller, Get, Patch, Body, Query } from '@nestjs/common';
import { AboutUsContentService } from './about-us-content.service';
import { UpdateAboutUsContentDto } from './dto/update-about-us-content.dto';

@Controller('about-us-content')
export class AboutUsContentController {
  constructor(private readonly aboutUsContentService: AboutUsContentService) {}

  @Get()
  async get(@Query('lang') lang?: string) {
    if (lang && ['pt', 'en', 'fr'].includes(lang)) {
      return this.aboutUsContentService.getByLocale(lang);
    }
    return this.aboutUsContentService.get();
  }

  @Patch()
  async update(@Body() updateDto: UpdateAboutUsContentDto) {
    return this.aboutUsContentService.update(updateDto);
  }
}
