import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastTestimonial } from './entities/podcast-testimonial.entity';
import { CreatePodcastTestimonialDto } from './dto/create-podcast-testimonial.dto';
import { UpdatePodcastTestimonialDto } from './dto/update-podcast-testimonial.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastTestimonialsService {
  private readonly logger = new Logger(PodcastTestimonialsService.name);

  constructor(
    @InjectRepository(PodcastTestimonial)
    private podcastTestimonialRepository: Repository<PodcastTestimonial>,
    private translationService: TranslationService,
  ) {}

  private async translateTestimonial(data: Partial<PodcastTestimonial>): Promise<{
    role_en?: string;
    role_fr?: string;
    text_en?: string;
    text_fr?: string;
  }> {
    const translations = {
      role_en: '',
      role_fr: '',
      text_en: '',
      text_fr: '',
    };

    try {
      if (data.role_pt) {
        const [roleEn, roleFr] = await Promise.all([
          this.translationService.translate(data.role_pt, 'en-GB'),
          this.translationService.translate(data.role_pt, 'fr'),
        ]);
        translations.role_en = roleEn;
        translations.role_fr = roleFr;
      }

      if (data.text_pt) {
        const [textEn, textFr] = await Promise.all([
          this.translationService.translate(data.text_pt, 'en-GB'),
          this.translationService.translate(data.text_pt, 'fr'),
        ]);
        translations.text_en = textEn;
        translations.text_fr = textFr;
      }

      this.logger.log('Testimonial translations completed successfully');
    } catch (error) {
      this.logger.error('Error translating testimonial:', error);
    }

    return translations;
  }

  async create(createDto: CreatePodcastTestimonialDto): Promise<PodcastTestimonial> {
    const translations = await this.translateTestimonial(createDto);

    const testimonial = this.podcastTestimonialRepository.create({
      ...createDto,
      ...translations,
    });

    return this.podcastTestimonialRepository.save(testimonial);
  }

  async findAll(): Promise<PodcastTestimonial[]> {
    return this.podcastTestimonialRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllActive(): Promise<PodcastTestimonial[]> {
    return this.podcastTestimonialRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PodcastTestimonial> {
    const testimonial = await this.podcastTestimonialRepository.findOne({ where: { id } });
    if (!testimonial) {
      throw new NotFoundException(`Podcast testimonial with ID "${id}" not found`);
    }
    return testimonial;
  }

  async update(id: string, updateDto: UpdatePodcastTestimonialDto): Promise<PodcastTestimonial> {
    const testimonial = await this.findOne(id);

    const translations = (updateDto.role_pt || updateDto.text_pt)
      ? await this.translateTestimonial(updateDto)
      : {};

    Object.assign(testimonial, updateDto, translations);

    return this.podcastTestimonialRepository.save(testimonial);
  }

  async remove(id: string): Promise<void> {
    const testimonial = await this.findOne(id);
    await this.podcastTestimonialRepository.remove(testimonial);
  }

  async findAllByLocale(locale: string = 'pt'): Promise<any[]> {
    const testimonials = await this.findAllActive();

    return testimonials.map((testimonial) => ({
      id: testimonial.id,
      name: testimonial.name,
      role: testimonial[`role_${locale}`] || testimonial.role_pt,
      text: testimonial[`text_${locale}`] || testimonial.text_pt,
      order: testimonial.order,
      createdAt: testimonial.createdAt,
      updatedAt: testimonial.updatedAt,
    }));
  }
}
