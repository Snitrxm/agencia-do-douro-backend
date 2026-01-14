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
import { DepoimentosService } from './depoimentos.service';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';

@Controller('depoimentos')
export class DepoimentosController {
  constructor(private readonly service: DepoimentosService) {}

  @Post()
  async create(@Body() dto: CreateDepoimentoDto) {
    return await this.service.create(dto);
  }

  @Get()
  findAll(@Query('lang') lang?: string) {
    if (lang) {
      return this.service.findAllByLocale(lang);
    }
    return this.service.findAll();
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateDepoimentoDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
