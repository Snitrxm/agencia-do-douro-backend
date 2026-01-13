import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastTopic } from './entities/podcast-topic.entity';
import { CreatePodcastTopicDto } from './dto/create-podcast-topic.dto';
import { UpdatePodcastTopicDto } from './dto/update-podcast-topic.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastTopicsService {
  private readonly logger = new Logger(PodcastTopicsService.name);

  constructor(
    @InjectRepository(PodcastTopic)
    private podcastTopicRepository: Repository<PodcastTopic>,
    private translationService: TranslationService,
  ) {}

  /**
   * Auto-translate topic content from Portuguese to English and French using DeepL API
   */
  private async translateTopic(topicData: Partial<PodcastTopic>): Promise<{
    title_en?: string;
    title_fr?: string;
    description_en?: string;
    description_fr?: string;
  }> {
    const translations = {
      title_en: '',
      title_fr: '',
      description_en: '',
      description_fr: '',
    };

    try {
      // Translate title
      if (topicData.title_pt) {
        const [titleEn, titleFr] = await Promise.all([
          this.translationService.translate(topicData.title_pt, 'en-GB'),
          this.translationService.translate(topicData.title_pt, 'fr'),
        ]);
        translations.title_en = titleEn;
        translations.title_fr = titleFr;
      }

      // Translate description
      if (topicData.description_pt) {
        const [descriptionEn, descriptionFr] = await Promise.all([
          this.translationService.translate(
            topicData.description_pt,
            'en-GB',
          ),
          this.translationService.translate(topicData.description_pt, 'fr'),
        ]);
        translations.description_en = descriptionEn;
        translations.description_fr = descriptionFr;
      }

      this.logger.log('Topic translations completed successfully');
    } catch (error) {
      this.logger.error('Error translating topic:', error);
      // Return empty translations on error to prevent blocking the topic creation/update
    }

    return translations;
  }

  async create(
    createPodcastTopicDto: CreatePodcastTopicDto,
  ): Promise<PodcastTopic> {
    // Auto-translate Portuguese content to English and French
    const translations = await this.translateTopic(createPodcastTopicDto);

    const topic = this.podcastTopicRepository.create({
      ...createPodcastTopicDto,
      ...translations,
    });

    return this.podcastTopicRepository.save(topic);
  }

  async findAll(): Promise<PodcastTopic[]> {
    return this.podcastTopicRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PodcastTopic> {
    const topic = await this.podcastTopicRepository.findOne({ where: { id } });
    if (!topic) {
      throw new NotFoundException(`Podcast topic with ID "${id}" not found`);
    }
    return topic;
  }

  async update(
    id: string,
    updatePodcastTopicDto: UpdatePodcastTopicDto,
  ): Promise<PodcastTopic> {
    const topic = await this.findOne(id);

    // Auto-translate Portuguese content to English and French if PT fields were updated
    const translations = await this.translateTopic(updatePodcastTopicDto);

    Object.assign(topic, updatePodcastTopicDto, translations);

    return this.podcastTopicRepository.save(topic);
  }

  async remove(id: string): Promise<void> {
    const topic = await this.findOne(id);
    await this.podcastTopicRepository.remove(topic);
  }
}
