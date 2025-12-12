import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NewslettersService } from './newsletters.service';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { UploadService } from '../upload/upload.service';

@Controller('newsletters')
export class NewslettersController {
  constructor(
    private readonly newslettersService: NewslettersService,
    private readonly uploadService: UploadService,
  ) {}

  @Post('upload-image')
  @UseInterceptors(
    FileInterceptor('image', {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        if (!file.mimetype.match(/\/(jpg|jpeg|png|gif|webp)$/)) {
          return cb(
            new BadRequestException(
              'Apenas imagens são permitidas (jpg, jpeg, png, gif, webp)',
            ),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async uploadImage(@UploadedFile() image: Express.Multer.File) {
    if (!image) {
      throw new BadRequestException('Nenhuma imagem foi enviada');
    }

    const result = await this.uploadService.uploadImage(image);
    return {
      url: result.secure_url,
    };
  }

  @Post()
  create(@Body() createNewsletterDto: CreateNewsletterDto) {
    return this.newslettersService.create(createNewsletterDto);
  }

  @Get()
  findAll() {
    return this.newslettersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.newslettersService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateNewsletterDto: UpdateNewsletterDto,
  ) {
    return this.newslettersService.update(id, updateNewsletterDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const newsletter = await this.newslettersService.remove(id);
    return {
      message: 'Newsletter deletada com sucesso',
      newsletter,
    };
  }
}
