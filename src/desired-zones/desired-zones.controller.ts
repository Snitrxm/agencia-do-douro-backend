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
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { DesiredZonesService } from './desired-zones.service';
import { CreateDesiredZoneDto } from './dto/create-desired-zone.dto';
import { UpdateDesiredZoneDto } from './dto/update-desired-zone.dto';
import { UploadService } from '../upload/upload.service';

@Controller('desired-zones')
export class DesiredZonesController {
  constructor(
    private readonly desiredZonesService: DesiredZonesService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        if (!isImage) {
          return cb(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async create(
    @Body() createDesiredZoneDto: CreateDesiredZoneDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('A imagem é obrigatória');
    }

    const imageUrl = await this.uploadService.uploadImage(files[0]);
    createDesiredZoneDto.image = imageUrl.url;

    return this.desiredZonesService.create(createDesiredZoneDto);
  }

  @Get()
  findAll() {
    return this.desiredZonesService.findAll();
  }

  @Get('active')
  findActive() {
    return this.desiredZonesService.findActive();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.desiredZonesService.findOne(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        if (!isImage) {
          return cb(
            new BadRequestException('Apenas imagens são permitidas'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  async update(
    @Param('id') id: string,
    @Body() updateDesiredZoneDto: UpdateDesiredZoneDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    if (files && files.length > 0) {
      const imageUrl = await this.uploadService.uploadImage(files[0]);
      updateDesiredZoneDto.image = imageUrl.url;
    }

    return this.desiredZonesService.update(id, updateDesiredZoneDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  remove(@Param('id') id: string) {
    return this.desiredZonesService.remove(id);
  }
}
