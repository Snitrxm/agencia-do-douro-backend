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
import { CountryConfigsService } from './country-configs.service';
import { CreateCountryConfigDto } from './dto/create-country-config.dto';
import { UpdateCountryConfigDto } from './dto/update-country-config.dto';

@Controller('country-configs')
export class CountryConfigsController {
  constructor(private readonly countryConfigsService: CountryConfigsService) {}

  @Post()
  create(@Body() dto: CreateCountryConfigDto) {
    return this.countryConfigsService.create(dto);
  }

  @Get()
  findAll() {
    return this.countryConfigsService.findAll();
  }

  @Get(':code')
  findOne(@Param('code') code: string) {
    return this.countryConfigsService.findOne(code);
  }

  @Patch(':code')
  update(@Param('code') code: string, @Body() dto: UpdateCountryConfigDto) {
    return this.countryConfigsService.update(code, dto);
  }

  @Delete(':code')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('code') code: string) {
    return this.countryConfigsService.remove(code);
  }
}
