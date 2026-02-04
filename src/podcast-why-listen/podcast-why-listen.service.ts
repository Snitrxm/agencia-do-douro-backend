import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastWhyListenCard } from './entities/podcast-why-listen-card.entity';
import { CreatePodcastWhyListenCardDto } from './dto/create-podcast-why-listen-card.dto';
import { UpdatePodcastWhyListenCardDto } from './dto/update-podcast-why-listen-card.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastWhyListenService {
  private readonly logger = new Logger(PodcastWhyListenService.name);

  constructor(
    @InjectRepository(PodcastWhyListenCard)
    private podcastWhyListenCardRepository: Repository<PodcastWhyListenCard>,
    private translationService: TranslationService,
  ) {}

  private async translateCard(data: Partial<PodcastWhyListenCard>): Promise<{
    title_en?: string;
    title_fr?: string;
    subtext_en?: string;
    subtext_fr?: string;
  }> {
    const translations = {
      title_en: '',
      title_fr: '',
      subtext_en: '',
      subtext_fr: '',
    };

    try {
      if (data.title_pt) {
        const [titleEn, titleFr] = await Promise.all([
          this.translationService.translate(data.title_pt, 'en-GB'),
          this.translationService.translate(data.title_pt, 'fr'),
        ]);
        translations.title_en = titleEn;
        translations.title_fr = titleFr;
      }

      if (data.subtext_pt) {
        const [subtextEn, subtextFr] = await Promise.all([
          this.translationService.translate(data.subtext_pt, 'en-GB'),
          this.translationService.translate(data.subtext_pt, 'fr'),
        ]);
        translations.subtext_en = subtextEn;
        translations.subtext_fr = subtextFr;
      }

      this.logger.log('WhyListen card translations completed successfully');
    } catch (error) {
      this.logger.error('Error translating WhyListen card:', error);
    }

    return translations;
  }

  async create(createDto: CreatePodcastWhyListenCardDto): Promise<PodcastWhyListenCard> {
    const translations = await this.translateCard(createDto);

    const card = this.podcastWhyListenCardRepository.create({
      ...createDto,
      ...translations,
    });

    return this.podcastWhyListenCardRepository.save(card);
  }

  async findAll(): Promise<PodcastWhyListenCard[]> {
    return this.podcastWhyListenCardRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllActive(): Promise<PodcastWhyListenCard[]> {
    return this.podcastWhyListenCardRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PodcastWhyListenCard> {
    const card = await this.podcastWhyListenCardRepository.findOne({ where: { id } });
    if (!card) {
      throw new NotFoundException(`Podcast WhyListen card with ID "${id}" not found`);
    }
    return card;
  }

  async update(id: string, updateDto: UpdatePodcastWhyListenCardDto): Promise<PodcastWhyListenCard> {
    const card = await this.findOne(id);

    const translations = (updateDto.title_pt || updateDto.subtext_pt)
      ? await this.translateCard(updateDto)
      : {};

    Object.assign(card, updateDto, translations);

    return this.podcastWhyListenCardRepository.save(card);
  }

  async remove(id: string): Promise<void> {
    const card = await this.findOne(id);
    await this.podcastWhyListenCardRepository.remove(card);
  }

  async findAllByLocale(locale: string = 'pt'): Promise<any[]> {
    const cards = await this.findAllActive();

    return cards.map((card) => ({
      id: card.id,
      iconKey: card.iconKey,
      title: card[`title_${locale}`] || card.title_pt,
      subtext: card[`subtext_${locale}`] || card.subtext_pt,
      order: card.order,
      createdAt: card.createdAt,
      updatedAt: card.updatedAt,
    }));
  }
}
