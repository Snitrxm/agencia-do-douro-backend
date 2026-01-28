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
import { I18n, I18nContext } from 'nestjs-i18n';
import { PropertiesService } from './properties.service';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import {
  CreateImageSectionDto,
  UpdateImageSectionDto,
} from './dto/image-section.dto';
import {
  AddRelatedPropertiesDto,
  RemoveRelatedPropertiesDto,
  SetRelatedPropertiesDto,
} from './dto/manage-related-properties.dto';
import { CreatePropertyFileDto } from './dto/create-property-file.dto';
import { UpdatePropertyFileDto } from './dto/update-property-file.dto';
import {
  CreatePropertyFractionDto,
  UpdatePropertyFractionDto,
  BulkCreateFractionsDto,
} from './dto/property-fraction.dto';
import {
  CreatePropertyFractionColumnDto,
  UpdatePropertyFractionColumnDto,
} from './dto/property-fraction-column.dto';
import { UploadService } from '../upload/upload.service';
import { v4 as uuidv4 } from 'uuid';

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
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        const isVideo = file.mimetype.match(/^video\/(mp4|mpeg|quicktime|x-msvideo|x-matroska|webm)$/);

        if (!isImage && !isVideo) {
          return cb(
            new BadRequestException(
              'Apenas imagens (jpg, jpeg, png, gif, webp) e vídeos (mp4, mov, avi, mkv, webm) são permitidos',
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
    // Gera um UUID antecipadamente para usar no nome do arquivo
    const propertyId = uuidv4();

    // Upload da mídia principal (imagem ou vídeo) com o ID gerado
    let imageUrl: string | undefined;
    if (image && image.length > 0) {
      const uploadedUrls = await this.uploadService.uploadMultipleMedia(image, {
        propertyId,
      });
      imageUrl = uploadedUrls[0];
    }

    // Cria a propriedade com o ID pré-gerado e a URL da imagem
    const propertyData = {
      ...createPropertyDto,
      image: imageUrl || createPropertyDto.image,
    };

    return this.propertiesService.createWithId(propertyId, propertyData);
  }

  @Get()
  findAll(@Query() filterPropertyDto: FilterPropertyDto) {
    return this.propertiesService.findAll(
      filterPropertyDto,
      filterPropertyDto.lang || 'pt',
    );
  }

  @Get('featured/list')
  findFeatured(@Query('lang') lang?: string) {
    return this.propertiesService.findFeatured(lang || 'pt');
  }

  @Get('search')
  search(
    @Query('q') query: string,
    @Query('limit') limit?: string,
    @Query('lang') lang?: string,
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : 5;
    return this.propertiesService.search(query, limitNumber, lang || 'pt');
  }

  @Get(':id')
  findOne(
    @Param('id') id: string,
    @Query('includeRelated') includeRelated?: string,
    @Query('lang') lang?: string,
  ) {
    return this.propertiesService.findOne(
      id,
      includeRelated === 'true',
      lang || 'pt',
    );
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
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        const isVideo = file.mimetype.match(/^video\/(mp4|mpeg|quicktime|x-msvideo|x-matroska|webm)$/);

        if (!isImage && !isVideo) {
          return cb(
            new BadRequestException(
              'Apenas imagens (jpg, jpeg, png, gif, webp) e vídeos (mp4, mov, avi, mkv, webm) são permitidos',
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
    FilesInterceptor('images', undefined, {
      limits: { fileSize: 200 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        const isVideo = file.mimetype.match(/^video\/(mp4|mpeg|quicktime|x-msvideo|x-matroska|webm)$/);

        if (!isImage && !isVideo) {
          return cb(
            new BadRequestException(
              'Apenas imagens (jpg, jpeg, png, gif, webp) e vídeos (mp4, mov, avi, mkv, webm) são permitidos',
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
    FilesInterceptor('imagesToAdd', undefined, {
      limits: { fileSize: 200 * 1024 * 1024 },
      fileFilter: (_req, file, cb) => {
        const isImage = file.mimetype.match(/^image\/(jpg|jpeg|png|gif|webp)$/);
        const isVideo = file.mimetype.match(/^video\/(mp4|mpeg|quicktime|x-msvideo|x-matroska|webm)$/);

        if (!isImage && !isVideo) {
          return cb(
            new BadRequestException(
              'Apenas imagens (jpg, jpeg, png, gif, webp) e vídeos (mp4, mov, avi, mkv, webm) são permitidos',
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
    const section = await this.propertiesService.deleteImageSection(sectionId);

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

  // ==========================================
  // Endpoints para gerenciar propriedades relacionadas
  // ==========================================

  /**
   * GET /properties/:id/related
   * Busca todas as propriedades relacionadas
   */
  @Get(':id/related')
  async getRelatedProperties(@Param('id') propertyId: string) {
    return this.propertiesService.getRelatedProperties(propertyId);
  }

  /**
   * GET /properties/:id/similar
   * Busca propriedades similares (sugestões automáticas)
   */
  @Get(':id/similar')
  async findSimilarProperties(
    @Param('id') propertyId: string,
    @Query('limit') limit?: string,
  ) {
    const limitNumber = limit ? parseInt(limit, 10) : 5;
    return this.propertiesService.findSimilarProperties(
      propertyId,
      limitNumber,
    );
  }

  /**
   * POST /properties/:id/related
   * Adiciona propriedades relacionadas (mantém existentes)
   */
  @Post(':id/related')
  async addRelatedProperties(
    @Param('id') propertyId: string,
    @Body() addRelatedPropertiesDto: AddRelatedPropertiesDto,
  ) {
    const property = await this.propertiesService.addRelatedProperties(
      propertyId,
      addRelatedPropertiesDto,
    );

    if (!property) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return property;
  }

  /**
   * DELETE /properties/:id/related
   * Remove propriedades relacionadas específicas
   */
  @Delete(':id/related')
  async removeRelatedProperties(
    @Param('id') propertyId: string,
    @Body() removeRelatedPropertiesDto: RemoveRelatedPropertiesDto,
  ) {
    const property = await this.propertiesService.removeRelatedProperties(
      propertyId,
      removeRelatedPropertiesDto,
    );

    if (!property) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return {
      message: 'Propriedades relacionadas removidas com sucesso',
      property,
    };
  }

  /**
   * PATCH /properties/:id/related
   * Define (substitui) todas as propriedades relacionadas
   */
  @Patch(':id/related')
  async setRelatedProperties(
    @Param('id') propertyId: string,
    @Body() setRelatedPropertiesDto: SetRelatedPropertiesDto,
  ) {
    const property = await this.propertiesService.setRelatedProperties(
      propertyId,
      setRelatedPropertiesDto,
    );

    if (!property) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return property;
  }

  // ==========================================
  // Endpoints para gerenciar arquivos de propriedades
  // ==========================================

  /**
   * GET /properties/:id/files
   * Lista todos os arquivos de uma propriedade
   */
  @Get(':id/files')
  async getPropertyFiles(@Param('id') propertyId: string) {
    return this.propertiesService.getPropertyFiles(propertyId);
  }

  /**
   * POST /properties/:id/files
   * Upload de arquivo único
   */
  @Post(':id/files')
  @UseInterceptors(
    FilesInterceptor('file', 1, {
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  async uploadPropertyFile(
    @Param('id') propertyId: string,
    @Body() createPropertyFileDto: CreatePropertyFileDto,
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const propertyFile = await this.propertiesService.createPropertyFile(
      propertyId,
      createPropertyFileDto,
      files[0],
    );

    if (!propertyFile) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return propertyFile;
  }

  /**
   * POST /properties/:id/files/multiple
   * Upload de múltiplos arquivos
   */
  @Post(':id/files/multiple')
  @UseInterceptors(
    FilesInterceptor('files', 20, {
      limits: { fileSize: 200 * 1024 * 1024 },
    }),
  )
  async uploadMultiplePropertyFiles(
    @Param('id') propertyId: string,
    @Body() body: { title?: string; isVisible?: string },
    @UploadedFiles() files?: Express.Multer.File[],
  ) {
    if (!files || files.length === 0) {
      throw new BadRequestException('Nenhum arquivo foi enviado');
    }

    const isVisible = body.isVisible === 'false' ? false : true;

    const propertyFiles =
      await this.propertiesService.uploadMultiplePropertyFiles(
        propertyId,
        files,
        body.title,
        isVisible,
      );

    return {
      message: `${propertyFiles.length} arquivo(s) enviado(s) com sucesso`,
      files: propertyFiles,
    };
  }

  /**
   * GET /properties/files/:fileId
   * Busca arquivo específico
   */
  @Get('files/:fileId')
  async getPropertyFile(@Param('fileId') fileId: string) {
    const file = await this.propertiesService.getPropertyFileById(fileId);

    if (!file) {
      throw new NotFoundException(`Arquivo com ID ${fileId} não encontrado`);
    }

    return file;
  }

  /**
   * PATCH /properties/files/:fileId
   * Atualiza metadados do arquivo
   */
  @Patch('files/:fileId')
  async updatePropertyFile(
    @Param('fileId') fileId: string,
    @Body() updatePropertyFileDto: UpdatePropertyFileDto,
  ) {
    const file = await this.propertiesService.updatePropertyFile(
      fileId,
      updatePropertyFileDto,
    );

    if (!file) {
      throw new NotFoundException(`Arquivo com ID ${fileId} não encontrado`);
    }

    return file;
  }

  /**
   * DELETE /properties/files/:fileId
   * Deleta arquivo
   */
  @Delete('files/:fileId')
  async deletePropertyFile(@Param('fileId') fileId: string) {
    const file = await this.propertiesService.deletePropertyFile(fileId);

    if (!file) {
      throw new NotFoundException(`Arquivo com ID ${fileId} não encontrado`);
    }

    return {
      message: 'Arquivo deletado com sucesso',
      file,
    };
  }

  // ==========================================
  // Endpoints para gerenciar frações de propriedades
  // ==========================================

  /**
   * GET /properties/:id/fractions
   * Lista todas as frações de uma propriedade
   */
  @Get(':id/fractions')
  async getFractions(@Param('id') propertyId: string) {
    return this.propertiesService.getFractions(propertyId);
  }

  /**
   * POST /properties/:id/fractions
   * Cria uma nova fração
   */
  @Post(':id/fractions')
  async createFraction(
    @Param('id') propertyId: string,
    @Body() createFractionDto: CreatePropertyFractionDto,
  ) {
    const fraction = await this.propertiesService.createFraction(
      propertyId,
      createFractionDto,
    );

    if (!fraction) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return fraction;
  }

  /**
   * POST /properties/:id/fractions/bulk
   * Cria múltiplas frações de uma vez
   */
  @Post(':id/fractions/bulk')
  async bulkCreateFractions(
    @Param('id') propertyId: string,
    @Body() bulkCreateDto: BulkCreateFractionsDto,
  ) {
    try {
      const fractions = await this.propertiesService.bulkCreateFractions(
        propertyId,
        bulkCreateDto,
      );

      return {
        message: `${fractions.length} fração(ões) criada(s) com sucesso`,
        fractions,
      };
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  /**
   * PATCH /properties/fractions/:fractionId
   * Atualiza uma fração
   */
  @Patch('fractions/:fractionId')
  async updateFraction(
    @Param('fractionId') fractionId: string,
    @Body() updateFractionDto: UpdatePropertyFractionDto,
  ) {
    const fraction = await this.propertiesService.updateFraction(
      fractionId,
      updateFractionDto,
    );

    if (!fraction) {
      throw new NotFoundException(
        `Fração com ID ${fractionId} não encontrada`,
      );
    }

    return fraction;
  }

  /**
   * DELETE /properties/fractions/:fractionId
   * Deleta uma fração
   */
  @Delete('fractions/:fractionId')
  async deleteFraction(@Param('fractionId') fractionId: string) {
    const fraction = await this.propertiesService.deleteFraction(fractionId);

    if (!fraction) {
      throw new NotFoundException(
        `Fração com ID ${fractionId} não encontrada`,
      );
    }

    return {
      message: 'Fração deletada com sucesso',
      fraction,
    };
  }

  // ==========================================
  // Endpoints para gerenciar colunas de frações
  // ==========================================

  /**
   * GET /properties/:id/fraction-columns
   * Lista todas as colunas de frações de uma propriedade
   */
  @Get(':id/fraction-columns')
  async getFractionColumns(@Param('id') propertyId: string) {
    return this.propertiesService.getFractionColumns(propertyId);
  }

  /**
   * POST /properties/:id/fraction-columns
   * Cria uma nova coluna de fração
   */
  @Post(':id/fraction-columns')
  async createFractionColumn(
    @Param('id') propertyId: string,
    @Body() createColumnDto: CreatePropertyFractionColumnDto,
  ) {
    const column = await this.propertiesService.createFractionColumn(
      propertyId,
      createColumnDto,
    );

    if (!column) {
      throw new NotFoundException(
        `Propriedade com ID ${propertyId} não encontrada`,
      );
    }

    return column;
  }

  /**
   * PATCH /properties/fraction-columns/:columnId
   * Atualiza uma coluna de fração
   */
  @Patch('fraction-columns/:columnId')
  async updateFractionColumn(
    @Param('columnId') columnId: string,
    @Body() updateColumnDto: UpdatePropertyFractionColumnDto,
  ) {
    const column = await this.propertiesService.updateFractionColumn(
      columnId,
      updateColumnDto,
    );

    if (!column) {
      throw new NotFoundException(
        `Coluna com ID ${columnId} não encontrada`,
      );
    }

    return column;
  }

  /**
   * DELETE /properties/fraction-columns/:columnId
   * Deleta uma coluna de fração
   */
  @Delete('fraction-columns/:columnId')
  async deleteFractionColumn(@Param('columnId') columnId: string) {
    const column = await this.propertiesService.deleteFractionColumn(columnId);

    if (!column) {
      throw new NotFoundException(
        `Coluna com ID ${columnId} não encontrada`,
      );
    }

    return {
      message: 'Coluna deletada com sucesso',
      column,
    };
  }
}
