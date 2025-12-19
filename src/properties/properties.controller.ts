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
  NotFoundException,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import {
  CreateImageSectionDto,
  UpdateImageSectionDto,
} from './dto/image-section.dto';
import { UploadService } from '../upload/upload.service';

@Controller('properties')
export class PropertiesController {
  constructor(
    private readonly propertiesService: PropertiesService,
    private readonly uploadService: UploadService,
  ) {}

  @Post()
  @UseInterceptors(
    FilesInterceptor('image', 1, {
      limits: { fileSize: 200 * 1024 * 1024 },
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
    @UploadedFiles() image?: Express.Multer.File[],
  ) {
    // Upload da imagem principal para o Cloudinary (se houver)
    let imageUrl: string | undefined;
    if (image && image.length > 0) {
      const uploadedUrls =
        await this.uploadService.uploadMultipleImages(image);
      imageUrl = uploadedUrls[0];
    }

    // Adiciona a URL da imagem ao DTO (se houver)
    const propertyData = {
      ...createPropertyDto,
      image: imageUrl || createPropertyDto.image,
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
    FilesInterceptor('image', 1, {
      limits: { fileSize: 200 * 1024 * 1024 },
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
  async update(
    @Param('id') id: string,
    @Body() updatePropertyDto: UpdatePropertyDto,
    @UploadedFiles() image?: Express.Multer.File[],
  ) {
    return this.propertiesService.update(id, updatePropertyDto, image);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.propertiesService.remove(id);
  }

  // Endpoints para gerenciar seções de imagens
  @Get(':id/image-sections')
  async getImageSections(@Param('id') propertyId: string) {
    return this.propertiesService.getPropertyImageSections(propertyId);
  }

  @Post(':id/image-sections')
  @UseInterceptors(
    FilesInterceptor('images', 10, {
      limits: { fileSize: 200 * 1024 * 1024 },
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
  async createImageSection(
    @Param('id') propertyId: string,
    @Body() createImageSectionDto: CreateImageSectionDto,
    @UploadedFiles() images?: Express.Multer.File[],
  ) {
    const section = await this.propertiesService.createImageSection(
      propertyId,
      createImageSectionDto,
      images,
    );

    if (!section) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return section;
  }

  @Patch('image-sections/:sectionId')
  @UseInterceptors(
    FilesInterceptor('imagesToAdd', 10, {
      limits: { fileSize: 200 * 1024 * 1024 },
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
  async updateImageSection(
    @Param('sectionId') sectionId: string,
    @Body() updateImageSectionDto: UpdateImageSectionDto,
    @UploadedFiles() imagesToAdd?: Express.Multer.File[],
  ) {
    const section = await this.propertiesService.updateImageSection(
      sectionId,
      updateImageSectionDto,
      imagesToAdd,
    );

    if (!section) {
      throw new NotFoundException(
        `Seção de imagens com ID ${sectionId} não encontrada`,
      );
    }

    return section;
  }

  @Delete('image-sections/:sectionId')
  async deleteImageSection(@Param('sectionId') sectionId: string) {
    const section =
      await this.propertiesService.deleteImageSection(sectionId);

    if (!section) {
      throw new NotFoundException(
        `Seção de imagens com ID ${sectionId} não encontrada`,
      );
    }

    return {
      message: 'Seção de imagens deletada com sucesso',
      section,
    };
  }
}
