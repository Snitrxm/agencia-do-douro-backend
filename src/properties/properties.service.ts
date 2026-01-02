import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyImageSection } from './entities/property-image-section.entity';
import { PropertyFile } from './entities/property-file.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UploadService } from '../upload/upload.service';
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

@Injectable()
export class PropertiesService {
  private readonly logger = new Logger(PropertiesService.name);

  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyImageSection)
    private imageSectionRepository: Repository<PropertyImageSection>,
    @InjectRepository(PropertyFile)
    private propertyFileRepository: Repository<PropertyFile>,
    private uploadService: UploadService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    // Extrair campos que precisam ser tratados separadamente
    const { teamMemberId, relatedPropertyIds, ...propertyData } = createPropertyDto;

    // Buscar propriedades relacionadas se IDs foram fornecidos
    let relatedProperties: Property[] = [];
    if (relatedPropertyIds && relatedPropertyIds.length > 0) {
      relatedProperties = await this.propertyRepository.find({
        where: { id: In(relatedPropertyIds) },
      });

      // Validar que todas as propriedades existem
      if (relatedProperties.length !== relatedPropertyIds.length) {
        const foundIds = relatedProperties.map((p) => p.id);
        const notFoundIds = relatedPropertyIds.filter(
          (id) => !foundIds.includes(id),
        );
        throw new Error(
          `Propriedades não encontradas: ${notFoundIds.join(', ')}`,
        );
      }
    }

    const property = this.propertyRepository.create({
      ...propertyData,
      relatedProperties,
      teamMember: teamMemberId ? { id: teamMemberId } as any : null,
    });

    return this.propertyRepository.save(property);
  }

  async findAll(filterPropertyDto: FilterPropertyDto): Promise<{
    data: Property[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  }> {
    const {
      minPrice,
      maxPrice,
      propertyType,
      transactionType,
      propertyState,
      energyClass,
      status,
      distrito,
      concelho,
      minArea,
      maxArea,
      bedrooms,
      bathrooms,
      minGarageSpaces,
      maxGarageSpaces,
      isEmpreendimento,
      search,
      sortBy = '-createdAt',
      page = 1,
      limit = 9,
    } = filterPropertyDto;

    const queryBuilder = this.propertyRepository.createQueryBuilder('property');

    // Filtro de preço
    if (minPrice !== undefined && maxPrice !== undefined) {
      queryBuilder.andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
        minPrice,
        maxPrice,
      });
    } else if (minPrice !== undefined) {
      queryBuilder.andWhere('property.price >= :minPrice', { minPrice });
    } else if (maxPrice !== undefined) {
      queryBuilder.andWhere('property.price <= :maxPrice', { maxPrice });
    }

    // Filtro de tipo de propriedade
    if (propertyType) {
      queryBuilder.andWhere('property.propertyType = :propertyType', {
        propertyType,
      });
    }

    // Filtro de tipo de transação
    if (transactionType) {
      queryBuilder.andWhere('property.transactionType = :transactionType', {
        transactionType,
      });
    }

    // Filtro de estado do imóvel
    if (propertyState) {
      queryBuilder.andWhere('property.propertyState = :propertyState', {
        propertyState,
      });
    }

    // Filtro de classe energética
    if (energyClass) {
      queryBuilder.andWhere('property.energyClass = :energyClass', {
        energyClass,
      });
    }

    // Filtro de status
    if (status) {
      if (status === 'active') {
        queryBuilder.andWhere('property.status IN (:...status)', {
          status: ['active', 'reserved'],
        });
      } else {
        queryBuilder.andWhere('property.status = :status', { status });
      }
    }

    // Filtro de empreendimento
    if (isEmpreendimento !== undefined) {
      queryBuilder.andWhere('property.isEmpreendimento = :isEmpreendimento', {
        isEmpreendimento,
      });
    }

    // Filtros de localização
    if (distrito) {
      queryBuilder.andWhere('property.distrito LIKE :distrito', {
        distrito: `%${distrito}%`,
      });
    }
    if (concelho) {
      queryBuilder.andWhere('property.concelho LIKE :concelho', {
        concelho: `%${concelho}%`,
      });
    }

    // Filtro de área útil
    if (minArea !== undefined && maxArea !== undefined) {
      queryBuilder.andWhere(
        'property.usefulArea BETWEEN :minArea AND :maxArea',
        {
          minArea,
          maxArea,
        },
      );
    } else if (minArea !== undefined) {
      queryBuilder.andWhere('property.usefulArea >= :minArea', { minArea });
    } else if (maxArea !== undefined) {
      queryBuilder.andWhere('property.usefulArea <= :maxArea', { maxArea });
    }

    // Filtro de quartos (array de valores selecionados)
    if (bedrooms && bedrooms.length > 0) {
      if (bedrooms.includes(7)) {
        const specificValues = bedrooms.filter((b) => b < 7);
        if (specificValues.length > 0) {
          queryBuilder.andWhere(
            '(property.bedrooms IN (:...specificBedrooms) OR property.bedrooms >= 7)',
            { specificBedrooms: specificValues },
          );
        } else {
          queryBuilder.andWhere('property.bedrooms >= 7');
        }
      } else {
        queryBuilder.andWhere('property.bedrooms IN (:...bedrooms)', {
          bedrooms,
        });
      }
    }

    // Filtro de banheiros (array de valores selecionados)
    if (bathrooms && bathrooms.length > 0) {
      if (bathrooms.includes(7)) {
        const specificValues = bathrooms.filter((b) => b < 7);
        if (specificValues.length > 0) {
          queryBuilder.andWhere(
            '(property.bathrooms IN (:...specificBathrooms) OR property.bathrooms >= 7)',
            { specificBathrooms: specificValues },
          );
        } else {
          queryBuilder.andWhere('property.bathrooms >= 7');
        }
      } else {
        queryBuilder.andWhere('property.bathrooms IN (:...bathrooms)', {
          bathrooms,
        });
      }
    }

    // Filtro de vagas de garagem
    if (minGarageSpaces !== undefined && maxGarageSpaces !== undefined) {
      queryBuilder.andWhere(
        'property.garageSpaces BETWEEN :minGarageSpaces AND :maxGarageSpaces',
        { minGarageSpaces, maxGarageSpaces },
      );
    } else if (minGarageSpaces !== undefined) {
      queryBuilder.andWhere('property.garageSpaces >= :minGarageSpaces', {
        minGarageSpaces,
      });
    } else if (maxGarageSpaces !== undefined) {
      queryBuilder.andWhere('property.garageSpaces <= :maxGarageSpaces', {
        maxGarageSpaces,
      });
    }

    // Busca por texto (título e descrição)
    if (search) {
      queryBuilder.andWhere(
        '(property.title LIKE :search OR property.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    // Ordenação
    if (sortBy) {
      const isDescending = sortBy.startsWith('-');
      const field = isDescending ? sortBy.slice(1) : sortBy;
      queryBuilder.orderBy(`property.${field}`, isDescending ? 'DESC' : 'ASC');
    }

    // Paginação
    const skip = (page - 1) * limit;
    queryBuilder.skip(skip).take(limit);

    // Executar query
    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(
    id: string,
    includeRelated: boolean = false,
  ): Promise<Property | null> {
    const relations = ['imageSections', 'files', 'teamMember'];

    if (includeRelated) {
      relations.push('relatedProperties');
    }

    return this.propertyRepository.findOne({
      where: { id },
      relations,
      order: {
        imageSections: {
          displayOrder: 'ASC',
        },
      },
    });
  }

  async findFeatured(): Promise<Property[]> {
    return this.propertyRepository.find({
      where: { isFeatured: true, status: 'active' },
      order: { createdAt: 'DESC' },
      take: 3,
    });
  }

  async toggleFeatured(id: string): Promise<Property | null> {
    const property = await this.findOne(id);
    if (!property) {
      return null;
    }

    property.isFeatured = !property.isFeatured;
    return this.propertyRepository.save(property);
  }

  /**
   * Extrai o publicId de uma URL do Cloudinary
   * Exemplo: https://res.cloudinary.com/demo/image/upload/v1234567890/agencia-douro/properties/abc123.jpg
   * Retorna: agencia-douro/properties/abc123
   */
  private extractPublicIdFromUrl(url: string): string | null {
    try {
      const regex = /\/upload\/(?:v\d+\/)?(.+)\.\w+$/;
      const match = url.match(regex);
      return match ? match[1] : null;
    } catch (_error) {
      return null;
    }
  }

  async update(
    id: string,
    updatePropertyDto: UpdatePropertyDto,
    newImage?: Express.Multer.File[],
  ): Promise<Property | null> {
    const property = await this.findOne(id);

    if (!property) {
      return null;
    }

    // Se uma nova imagem foi enviada, deletar a antiga e fazer upload da nova
    if (newImage && newImage.length > 0) {
      // Deletar a imagem antiga do Cloudinary se existir
      if (property.image) {
        const publicId = this.extractPublicIdFromUrl(property.image);
        if (publicId) {
          try {
            await this.uploadService.deleteImage(publicId);
          } catch (error) {
            console.error(
              `Erro ao deletar imagem antiga do Cloudinary: ${publicId}`,
              error,
            );
          }
        }
      }

      // Upload da nova mídia (imagem ou vídeo)
      try {
        const uploadedUrls =
          await this.uploadService.uploadMultipleMedia(newImage);
        updatePropertyDto.image = uploadedUrls[0];
      } catch (error) {
        console.error('Erro ao fazer upload da nova mídia:', error);
        throw error;
      }
    }

    // Extrair campos que precisam ser tratados separadamente
    const { teamMemberId, relatedPropertyIds, ...updateData } = updatePropertyDto;

    // Atualizar campos básicos
    await this.propertyRepository.update(id, updateData);

    // Atualizar team member se fornecido
    if (teamMemberId !== undefined) {
      await this.propertyRepository
        .createQueryBuilder()
        .update(Property)
        .set({ teamMember: teamMemberId ? { id: teamMemberId } as any : null })
        .where('id = :id', { id })
        .execute();
    }

    // Atualizar propriedades relacionadas se fornecidas
    if (relatedPropertyIds !== undefined) {
      const propertyWithRelations = await this.propertyRepository.findOne({
        where: { id },
        relations: ['relatedProperties'],
      });

      if (propertyWithRelations) {
        if (relatedPropertyIds.length > 0) {
          const relatedProperties = await this.propertyRepository.find({
            where: { id: In(relatedPropertyIds) },
          });

          // Validar que todas as propriedades existem
          if (
            relatedProperties.length !==
            relatedPropertyIds.length
          ) {
            const foundIds = relatedProperties.map((p) => p.id);
            const notFoundIds = relatedPropertyIds.filter(
              (id) => !foundIds.includes(id),
            );
            throw new Error(
              `Propriedades não encontradas: ${notFoundIds.join(', ')}`,
            );
          }

          propertyWithRelations.relatedProperties = relatedProperties;
          await this.propertyRepository.save(propertyWithRelations);
        } else {
          propertyWithRelations.relatedProperties = [];
          await this.propertyRepository.save(propertyWithRelations);
        }
      }
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<Property | null> {
    const property = await this.findOne(id);
    if (property) {
      await this.propertyRepository.remove(property);
    }
    return property;
  }

  // Métodos para gerenciar seções de imagens
  async createImageSection(
    propertyId: string,
    createImageSectionDto: CreateImageSectionDto,
    images?: Express.Multer.File[],
  ): Promise<PropertyImageSection | null> {
    const property = await this.findOne(propertyId);
    if (!property) {
      return null;
    }

    let imageUrls: string[] = createImageSectionDto.images || [];

    if (images && images.length > 0) {
      const uploadedUrls =
        await this.uploadService.uploadMultipleMedia(images);
      imageUrls = [...imageUrls, ...uploadedUrls];
    }

    const imageSection = this.imageSectionRepository.create({
      propertyId,
      sectionName: createImageSectionDto.sectionName,
      images: imageUrls,
      displayOrder: createImageSectionDto.displayOrder || 0,
    });

    return this.imageSectionRepository.save(imageSection);
  }

  async updateImageSection(
    sectionId: string,
    updateImageSectionDto: UpdateImageSectionDto,
    imagesToAdd?: Express.Multer.File[],
  ): Promise<PropertyImageSection | null> {
    const section = await this.imageSectionRepository.findOne({
      where: { id: sectionId },
    });

    if (!section) {
      return null;
    }

    let updatedImages = section.images || [];

    // Remove imagens especificadas
    if (
      updateImageSectionDto.imagesToRemove &&
      updateImageSectionDto.imagesToRemove.length > 0
    ) {
      const deletePromises = updateImageSectionDto.imagesToRemove.map(
        async (imageUrl) => {
          const publicId = this.extractPublicIdFromUrl(imageUrl);
          if (publicId) {
            try {
              await this.uploadService.deleteImage(publicId);
            } catch (error) {
              console.error(
                `Erro ao deletar imagem do Cloudinary: ${publicId}`,
                error,
              );
            }
          }
        },
      );

      await Promise.all(deletePromises);

      updatedImages = updatedImages.filter(
        (imageUrl) => !updateImageSectionDto.imagesToRemove?.includes(imageUrl),
      );
    }

    // Adiciona novas imagens do array de URLs
    if (
      updateImageSectionDto.images &&
      updateImageSectionDto.images.length > 0
    ) {
      updatedImages = [...updatedImages, ...updateImageSectionDto.images];
    }

    // Faz upload das novas mídias (imagens ou vídeos)
    if (imagesToAdd && imagesToAdd.length > 0) {
      try {
        const newImageUrls =
          await this.uploadService.uploadMultipleMedia(imagesToAdd);
        updatedImages = [...updatedImages, ...newImageUrls];
      } catch (error) {
        console.error('Erro ao fazer upload das novas mídias:', error);
        throw error;
      }
    }

    // Atualiza a seção
    if (updateImageSectionDto.sectionName) {
      section.sectionName = updateImageSectionDto.sectionName;
    }

    if (updateImageSectionDto.displayOrder !== undefined) {
      section.displayOrder = updateImageSectionDto.displayOrder;
    }

    section.images = updatedImages;

    return this.imageSectionRepository.save(section);
  }

  async deleteImageSection(
    sectionId: string,
  ): Promise<PropertyImageSection | null> {
    const section = await this.imageSectionRepository.findOne({
      where: { id: sectionId },
    });

    if (!section) {
      return null;
    }

    // Deleta todas as imagens do Cloudinary
    if (section.images && section.images.length > 0) {
      const deletePromises = section.images.map(async (imageUrl) => {
        const publicId = this.extractPublicIdFromUrl(imageUrl);
        if (publicId) {
          try {
            await this.uploadService.deleteImage(publicId);
          } catch (error) {
            console.error(
              `Erro ao deletar imagem do Cloudinary: ${publicId}`,
              error,
            );
          }
        }
      });

      await Promise.all(deletePromises);
    }

    await this.imageSectionRepository.remove(section);
    return section;
  }

  async getPropertyImageSections(
    propertyId: string,
  ): Promise<PropertyImageSection[]> {
    return this.imageSectionRepository.find({
      where: { propertyId },
      order: { displayOrder: 'ASC' },
    });
  }

  // ==========================================
  // Métodos para gerenciar propriedades relacionadas
  // ==========================================

  /**
   * Busca as propriedades relacionadas de uma propriedade específica
   */
  async getRelatedProperties(propertyId: string): Promise<Property[]> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['relatedProperties'],
    });

    if (!property) {
      return [];
    }

    return property.relatedProperties || [];
  }

  /**
   * Adiciona propriedades relacionadas (mantém as existentes)
   */
  async addRelatedProperties(
    propertyId: string,
    addRelatedPropertiesDto: AddRelatedPropertiesDto,
  ): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['relatedProperties'],
    });

    if (!property) {
      return null;
    }

    // Buscar as novas propriedades relacionadas
    const newRelatedProperties = await this.propertyRepository.find({
      where: { id: In(addRelatedPropertiesDto.relatedPropertyIds) },
    });

    // Validar que todas as propriedades existem
    if (
      newRelatedProperties.length !==
      addRelatedPropertiesDto.relatedPropertyIds.length
    ) {
      const foundIds = newRelatedProperties.map((p) => p.id);
      const notFoundIds = addRelatedPropertiesDto.relatedPropertyIds.filter(
        (id) => !foundIds.includes(id),
      );
      throw new Error(
        `Propriedades não encontradas: ${notFoundIds.join(', ')}`,
      );
    }

    // Validar que não está adicionando a si mesma
    if (newRelatedProperties.some((p) => p.id === propertyId)) {
      throw new Error('Uma propriedade não pode ser relacionada a si mesma');
    }

    // Combinar propriedades existentes com novas (evitar duplicatas)
    const existingIds = property.relatedProperties?.map((p) => p.id) || [];
    const uniqueNewProperties = newRelatedProperties.filter(
      (p) => !existingIds.includes(p.id),
    );

    property.relatedProperties = [
      ...(property.relatedProperties || []),
      ...uniqueNewProperties,
    ];

    return this.propertyRepository.save(property);
  }

  /**
   * Remove propriedades relacionadas específicas
   */
  async removeRelatedProperties(
    propertyId: string,
    removeRelatedPropertiesDto: RemoveRelatedPropertiesDto,
  ): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['relatedProperties'],
    });

    if (!property) {
      return null;
    }

    // Filtrar removendo as propriedades especificadas
    property.relatedProperties = (property.relatedProperties || []).filter(
      (p) => !removeRelatedPropertiesDto.relatedPropertyIds.includes(p.id),
    );

    return this.propertyRepository.save(property);
  }

  /**
   * Define (substitui) todas as propriedades relacionadas
   */
  async setRelatedProperties(
    propertyId: string,
    setRelatedPropertiesDto: SetRelatedPropertiesDto,
  ): Promise<Property | null> {
    const property = await this.propertyRepository.findOne({
      where: { id: propertyId },
      relations: ['relatedProperties'],
    });

    if (!property) {
      return null;
    }

    // Se array vazio, limpar relacionamentos
    if (setRelatedPropertiesDto.relatedPropertyIds.length === 0) {
      property.relatedProperties = [];
      return this.propertyRepository.save(property);
    }

    // Buscar as novas propriedades relacionadas
    const newRelatedProperties = await this.propertyRepository.find({
      where: { id: In(setRelatedPropertiesDto.relatedPropertyIds) },
    });

    // Validar que todas as propriedades existem
    if (
      newRelatedProperties.length !==
      setRelatedPropertiesDto.relatedPropertyIds.length
    ) {
      const foundIds = newRelatedProperties.map((p) => p.id);
      const notFoundIds = setRelatedPropertiesDto.relatedPropertyIds.filter(
        (id) => !foundIds.includes(id),
      );
      throw new Error(
        `Propriedades não encontradas: ${notFoundIds.join(', ')}`,
      );
    }

    // Validar que não está adicionando a si mesma
    if (newRelatedProperties.some((p) => p.id === propertyId)) {
      throw new Error('Uma propriedade não pode ser relacionada a si mesma');
    }

    property.relatedProperties = newRelatedProperties;

    return this.propertyRepository.save(property);
  }

  /**
   * Busca propriedades similares baseadas em critérios
   * Útil para sugerir automaticamente propriedades relacionadas
   */
  async findSimilarProperties(
    propertyId: string,
    limit: number = 5,
  ): Promise<Property[]> {
    const property = await this.findOne(propertyId);

    if (!property) {
      return [];
    }

    const queryBuilder = this.propertyRepository
      .createQueryBuilder('property')
      .where('property.id != :propertyId', { propertyId })
      .andWhere('property.status = :status', { status: 'active' });

    // Filtros de similaridade
    // 1. Mesmo tipo de propriedade (peso alto)
    queryBuilder.andWhere('property.propertyType = :propertyType', {
      propertyType: property.propertyType,
    });

    // 2. Mesmo tipo de transação
    queryBuilder.andWhere('property.transactionType = :transactionType', {
      transactionType: property.transactionType,
    });

    // 3. Mesma localização (distrito)
    queryBuilder.andWhere('property.distrito = :distrito', {
      distrito: property.distrito,
    });

    // 4. Preço similar (±30%)
    const minPrice = property.price * 0.7;
    const maxPrice = property.price * 1.3;
    queryBuilder.andWhere('property.price BETWEEN :minPrice AND :maxPrice', {
      minPrice,
      maxPrice,
    });

    // Ordenar por data de criação (mais recentes primeiro)
    queryBuilder.orderBy('property.createdAt', 'DESC');

    // Limitar resultados
    queryBuilder.take(limit);

    return queryBuilder.getMany();
  }

  // ==========================================
  // Métodos para gerenciar arquivos de propriedades
  // ==========================================

  async createPropertyFile(
    propertyId: string,
    createPropertyFileDto: CreatePropertyFileDto,
    file: Express.Multer.File,
  ): Promise<PropertyFile | null> {
    const property = await this.findOne(propertyId);
    if (!property) return null;

    const uploadResult = await this.uploadService.uploadFile(file);

    const propertyFile = this.propertyFileRepository.create({
      propertyId,
      title: createPropertyFileDto.title || uploadResult.originalName,
      isVisible: createPropertyFileDto.isVisible ?? true,
      filename: uploadResult.filename,
      originalName: uploadResult.originalName,
      mimeType: uploadResult.mimeType,
      fileSize: uploadResult.fileSize,
      filePath: uploadResult.filePath,
    });

    return this.propertyFileRepository.save(propertyFile);
  }

  async getPropertyFiles(propertyId: string): Promise<PropertyFile[]> {
    return this.propertyFileRepository.find({
      where: { propertyId },
      order: { createdAt: 'DESC' },
    });
  }

  async getPropertyFileById(fileId: string): Promise<PropertyFile | null> {
    return this.propertyFileRepository.findOne({ where: { id: fileId } });
  }

  async updatePropertyFile(
    fileId: string,
    updatePropertyFileDto: UpdatePropertyFileDto,
  ): Promise<PropertyFile | null> {
    const propertyFile = await this.getPropertyFileById(fileId);
    if (!propertyFile) return null;

    if (updatePropertyFileDto.title !== undefined) {
      propertyFile.title = updatePropertyFileDto.title;
    }
    if (updatePropertyFileDto.isVisible !== undefined) {
      propertyFile.isVisible = updatePropertyFileDto.isVisible;
    }

    return this.propertyFileRepository.save(propertyFile);
  }

  async deletePropertyFile(fileId: string): Promise<PropertyFile | null> {
    const propertyFile = await this.getPropertyFileById(fileId);
    if (!propertyFile) return null;

    try {
      await this.uploadService.deleteFile(propertyFile.filename);
    } catch (error) {
      this.logger.error(
        `Erro ao deletar arquivo físico: ${propertyFile.filename}`,
        error,
      );
    }

    await this.propertyFileRepository.remove(propertyFile);
    return propertyFile;
  }

  async uploadMultiplePropertyFiles(
    propertyId: string,
    files: Express.Multer.File[],
    title?: string,
    isVisible: boolean = true,
  ): Promise<PropertyFile[]> {
    const property = await this.findOne(propertyId);
    if (!property) {
      throw new Error(`Propriedade com ID ${propertyId} não encontrada`);
    }

    const uploadPromises = files.map(async (file) => {
      const uploadResult = await this.uploadService.uploadFile(file);

      const propertyFile = this.propertyFileRepository.create({
        propertyId,
        title: title || uploadResult.originalName,
        isVisible,
        filename: uploadResult.filename,
        originalName: uploadResult.originalName,
        mimeType: uploadResult.mimeType,
        fileSize: uploadResult.fileSize,
        filePath: uploadResult.filePath,
      });

      return this.propertyFileRepository.save(propertyFile);
    });

    return Promise.all(uploadPromises);
  }
}
