import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastGalleryImage } from './entities/podcast-gallery-image.entity';
import { CreatePodcastGalleryImageDto } from './dto/create-podcast-gallery-image.dto';
import { UpdatePodcastGalleryImageDto } from './dto/update-podcast-gallery-image.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastGalleryService {
  private readonly logger = new Logger(PodcastGalleryService.name);

  constructor(
    @InjectRepository(PodcastGalleryImage)
    private podcastGalleryImageRepository: Repository<PodcastGalleryImage>,
    private translationService: TranslationService,
  ) {}

  private async translateImage(data: Partial<PodcastGalleryImage>): Promise<{
    alt_en?: string;
    alt_fr?: string;
  }> {
    const translations = {
      alt_en: '',
      alt_fr: '',
    };

    try {
      if (data.alt_pt) {
        const [altEn, altFr] = await Promise.all([
          this.translationService.translate(data.alt_pt, 'en-GB'),
          this.translationService.translate(data.alt_pt, 'fr'),
        ]);
        translations.alt_en = altEn;
        translations.alt_fr = altFr;
      }

      this.logger.log('Gallery image translations completed successfully');
    } catch (error) {
      this.logger.error('Error translating gallery image:', error);
    }

    return translations;
  }

  async create(createDto: CreatePodcastGalleryImageDto): Promise<PodcastGalleryImage> {
    const translations = createDto.alt_pt
      ? await this.translateImage(createDto)
      : {};

    const image = this.podcastGalleryImageRepository.create({
      ...createDto,
      ...translations,
    });

    return this.podcastGalleryImageRepository.save(image);
  }

  async findAll(): Promise<PodcastGalleryImage[]> {
    return this.podcastGalleryImageRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllActive(): Promise<PodcastGalleryImage[]> {
    return this.podcastGalleryImageRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PodcastGalleryImage> {
    const image = await this.podcastGalleryImageRepository.findOne({ where: { id } });
    if (!image) {
      throw new NotFoundException(`Podcast gallery image with ID "${id}" not found`);
    }
    return image;
  }

  async update(id: string, updateDto: UpdatePodcastGalleryImageDto): Promise<PodcastGalleryImage> {
    const image = await this.findOne(id);

    const translations = updateDto.alt_pt
      ? await this.translateImage(updateDto)
      : {};

    Object.assign(image, updateDto, translations);

    return this.podcastGalleryImageRepository.save(image);
  }

  async remove(id: string): Promise<void> {
    const image = await this.findOne(id);
    await this.podcastGalleryImageRepository.remove(image);
  }

  async findAllByLocale(locale: string = 'pt'): Promise<any[]> {
    const images = await this.findAllActive();

    return images.map((image) => ({
      id: image.id,
      mediaType: image.mediaType || 'image',
      imageUrl: image.imageUrl,
      videoUrl: image.videoUrl,
      alt: image[`alt_${locale}`] || image.alt_pt || '',
      order: image.order,
      createdAt: image.createdAt,
      updatedAt: image.updatedAt,
    }));
  }
}
