import { Controller, Get, Patch, Body, Query } from '@nestjs/common';
import { SellPropertyContentService } from './sell-property-content.service';
import { UpdateSellPropertyContentDto } from './dto/update-sell-property-content.dto';

@Controller('sell-property-content')
export class SellPropertyContentController {
  constructor(private readonly sellPropertyContentService: SellPropertyContentService) {}

  @Get()
  async get(@Query('lang') lang?: string) {
    if (lang && ['pt', 'en', 'fr'].includes(lang)) {
      return this.sellPropertyContentService.getByLocale(lang);
    }
    return this.sellPropertyContentService.get();
  }

  @Patch()
  async update(@Body() updateDto: UpdateSellPropertyContentDto) {
    return this.sellPropertyContentService.update(updateDto);
  }
}
