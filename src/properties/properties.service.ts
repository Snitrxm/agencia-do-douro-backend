import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Property } from './entities/property.entity';
import { PropertyImageSection } from './entities/property-image-section.entity';
import { CreatePropertyDto } from './dto/create-property.dto';
import { UpdatePropertyDto } from './dto/update-property.dto';
import { FilterPropertyDto } from './dto/filter-property.dto';
import { UploadService } from '../upload/upload.service';
import {
  CreateImageSectionDto,
  UpdateImageSectionDto,
} from './dto/image-section.dto';

@Injectable()
export class PropertiesService {
  constructor(
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
    @InjectRepository(PropertyImageSection)
    private imageSectionRepository: Repository<PropertyImageSection>,
    private uploadService: UploadService,
  ) {}

  async create(createPropertyDto: CreatePropertyDto): Promise<Property> {
    const property = this.propertyRepository.create(createPropertyDto);
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
      limit = 10,
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
      queryBuilder.andWhere('property.status = :status', { status });
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

  async findOne(id: string): Promise<Property | null> {
    return this.propertyRepository.findOne({
      where: { id },
      relations: ['imageSections'],
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
    } catch (error) {
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

      // Upload da nova imagem
      try {
        const uploadedUrls =
          await this.uploadService.uploadMultipleImages(newImage);
        updatePropertyDto.image = uploadedUrls[0];
      } catch (error) {
        console.error('Erro ao fazer upload da nova imagem:', error);
        throw error;
      }
    }

    await this.propertyRepository.update(id, updatePropertyDto);

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
        await this.uploadService.uploadMultipleImages(images);
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
    if (updateImageSectionDto.images && updateImageSectionDto.images.length > 0) {
      updatedImages = [...updatedImages, ...updateImageSectionDto.images];
    }

    // Faz upload das novas imagens
    if (imagesToAdd && imagesToAdd.length > 0) {
      try {
        const newImageUrls =
          await this.uploadService.uploadMultipleImages(imagesToAdd);
        updatedImages = [...updatedImages, ...newImageUrls];
      } catch (error) {
        console.error('Erro ao fazer upload das novas imagens:', error);
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

  async deleteImageSection(sectionId: string): Promise<PropertyImageSection | null> {
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
}
