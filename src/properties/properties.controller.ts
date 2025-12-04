import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UploadService } from '../upload/upload.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: { fileSize: 5 * 1024 * 1024 },
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
  async create(
    @Body() createPropertyDto: CreatePropertyDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    // Upload das imagens para o Cloudinary (se houver)
    let imageUrls: string[] = [];
    if (images && images.length > 0) {
      imageUrls = await this.uploadService.uploadMultipleImages(images);
    }

    // Adiciona as URLs das imagens ao DTO (se houver)
    const propertyData = {
      ...createPropertyDto,
      images:
        imageUrls.length > 0
          ? [...(createPropertyDto.images || []), ...imageUrls]
          : createPropertyDto.images,
    };

    return this.propertiesService.create(propertyData);
  }

  @Get()
  findAll(@Query() filterPropertyDto: FilterPropertyDto) {
    return this.propertiesService.findAll(filterPropertyDto);
  }

  @Get('featured/list')
  findFeatured() {
    return this.propertiesService.findFeatured();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.propertiesService.findOne(id);
  }

  @Patch(':id/featured')
  toggleFeatured(@Param('id') id: string) {
    return this.propertiesService.toggleFeatured(id);
  }

  @Patch(':id')
  @UseInterceptors(
    FilesInterceptor('imagesToAdd', 10, {
      limits: { fileSize: 5 * 1024 * 1024 },
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
  update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles() imagesToAdd?: Express.Multer.File[],
  ) {
    return this.propertiesService.update(id, updatePropertyDto, imagesToAdd);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }
}
