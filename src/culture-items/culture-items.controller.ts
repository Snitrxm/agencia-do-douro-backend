import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { CultureItemsService } from './culture-items.service';
import { CreateCultureItemDto } from './dto/create-culture-item.dto';
import { UpdateCultureItemDto } from './dto/update-culture-item.dto';

@Controller('culture-items')
export class CultureItemsController {
  constructor(private readonly cultureItemsService: CultureItemsService) {}

  @Get()
  async findAll(@Query('lang') lang?: string) {
    if (lang && ['pt', 'en', 'fr'].includes(lang)) {
      return this.cultureItemsService.findAllByLocale(lang);
    }
    return this.cultureItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.cultureItemsService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateCultureItemDto) {
    return this.cultureItemsService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateCultureItemDto) {
    return this.cultureItemsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.cultureItemsService.remove(id);
    return { message: 'Culture item deleted successfully' };
  }
}
