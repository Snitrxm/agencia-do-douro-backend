import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastGuest } from './entities/podcast-guest.entity';
import { CreatePodcastGuestDto } from './dto/create-podcast-guest.dto';
import { UpdatePodcastGuestDto } from './dto/update-podcast-guest.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastGuestsService {
  private readonly logger = new Logger(PodcastGuestsService.name);

  constructor(
    @InjectRepository(PodcastGuest)
    private podcastGuestRepository: Repository<PodcastGuest>,
    private translationService: TranslationService,
  ) {}

  private async translateGuest(guestData: Partial<PodcastGuest>): Promise<{
    role_en?: string;
    role_fr?: string;
  }> {
    const translations = {
      role_en: '',
      role_fr: '',
    };

    try {
      if (guestData.role_pt) {
        const [roleEn, roleFr] = await Promise.all([
          this.translationService.translate(guestData.role_pt, 'en-GB'),
          this.translationService.translate(guestData.role_pt, 'fr'),
        ]);
        translations.role_en = roleEn;
        translations.role_fr = roleFr;
      }

      this.logger.log('Guest translations completed successfully');
    } catch (error) {
      this.logger.error('Error translating guest:', error);
    }

    return translations;
  }

  async create(createDto: CreatePodcastGuestDto): Promise<PodcastGuest> {
    const translations = await this.translateGuest(createDto);

    const guest = this.podcastGuestRepository.create({
      ...createDto,
      ...translations,
    });

    return this.podcastGuestRepository.save(guest);
  }

  async findAll(): Promise<PodcastGuest[]> {
    return this.podcastGuestRepository.find({
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findAllActive(): Promise<PodcastGuest[]> {
    return this.podcastGuestRepository.find({
      where: { isActive: true },
      order: { order: 'ASC', createdAt: 'DESC' },
    });
  }

  async findOne(id: string): Promise<PodcastGuest> {
    const guest = await this.podcastGuestRepository.findOne({ where: { id } });
    if (!guest) {
      throw new NotFoundException(`Podcast guest with ID "${id}" not found`);
    }
    return guest;
  }

  async update(id: string, updateDto: UpdatePodcastGuestDto): Promise<PodcastGuest> {
    const guest = await this.findOne(id);

    const translations = updateDto.role_pt
      ? await this.translateGuest(updateDto)
      : {};

    Object.assign(guest, updateDto, translations);

    return this.podcastGuestRepository.save(guest);
  }

  async remove(id: string): Promise<void> {
    const guest = await this.findOne(id);
    await this.podcastGuestRepository.remove(guest);
  }

  async findAllByLocale(locale: string = 'pt'): Promise<any[]> {
    const guests = await this.findAllActive();

    return guests.map((guest) => ({
      id: guest.id,
      name: guest.name,
      role: guest[`role_${locale}`] || guest.role_pt,
      imageUrl: guest.imageUrl,
      order: guest.order,
      createdAt: guest.createdAt,
      updatedAt: guest.updatedAt,
    }));
  }
}
