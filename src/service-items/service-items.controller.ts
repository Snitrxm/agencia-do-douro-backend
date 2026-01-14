import { Controller, Get, Post, Patch, Delete, Body, Param, Query } from '@nestjs/common';
import { ServiceItemsService } from './service-items.service';
import { CreateServiceItemDto } from './dto/create-service-item.dto';
import { UpdateServiceItemDto } from './dto/update-service-item.dto';

@Controller('service-items')
export class ServiceItemsController {
  constructor(private readonly serviceItemsService: ServiceItemsService) {}

  @Get()
  async findAll(@Query('lang') lang?: string) {
    if (lang && ['pt', 'en', 'fr'].includes(lang)) {
      return this.serviceItemsService.findAllByLocale(lang);
    }
    return this.serviceItemsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.serviceItemsService.findOne(id);
  }

  @Post()
  async create(@Body() createDto: CreateServiceItemDto) {
    return this.serviceItemsService.create(createDto);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateDto: UpdateServiceItemDto) {
    return this.serviceItemsService.update(id, updateDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    await this.serviceItemsService.remove(id);
    return { message: 'Service item deleted successfully' };
  }
}
