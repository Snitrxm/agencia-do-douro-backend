import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ServiceItem } from './entities/service-item.entity';
import { CreateServiceItemDto } from './dto/create-service-item.dto';
import { UpdateServiceItemDto } from './dto/update-service-item.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class ServiceItemsService {
  constructor(
    @InjectRepository(ServiceItem)
    private readonly serviceItemRepository: Repository<ServiceItem>,
    private readonly translationService: TranslationService,
  ) {}

  async findAll(): Promise<ServiceItem[]> {
    return this.serviceItemRepository.find({
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<ServiceItem> {
    const item = await this.serviceItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Service item with ID ${id} not found`);
    }
    return item;
  }

  async create(createDto: CreateServiceItemDto): Promise<ServiceItem> {
    let item = this.serviceItemRepository.create(createDto);
    item = await this.serviceItemRepository.save(item);

    // Traduz automaticamente
    await this.translateItem(item);

    return this.findOne(item.id);
  }

  async update(id: string, updateDto: UpdateServiceItemDto): Promise<ServiceItem> {
    let item = await this.findOne(id);
    Object.assign(item, updateDto);
    item = await this.serviceItemRepository.save(item);

    // Traduz campos atualizados
    await this.translateItem(item);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.serviceItemRepository.remove(item);
  }

  private async translateItem(item: ServiceItem): Promise<void> {
    try {
      const [titleEN, titleFR, descEN, descFR] = await Promise.all([
        this.translationService.translate(item.title_pt, 'en-GB'),
        this.translationService.translate(item.title_pt, 'fr'),
        this.translationService.translate(item.description_pt, 'en-GB'),
        this.translationService.translate(item.description_pt, 'fr'),
      ]);

      item.title_en = titleEN;
      item.title_fr = titleFR;
      item.description_en = descEN;
      item.description_fr = descFR;

      await this.serviceItemRepository.save(item);
    } catch (error) {
      console.error('Erro ao traduzir service item:', error);
    }
  }

  async findAllByLocale(locale: string = 'pt'): Promise<any[]> {
    const items = await this.findAll();
    return items.map(item => ({
      id: item.id,
      title: item[`title_${locale}`] || item.title_pt,
      description: item[`description_${locale}`] || item.description_pt,
      order: item.order,
      createdAt: item.createdAt,
      updatedAt: item.updatedAt,
    }));
  }
}
