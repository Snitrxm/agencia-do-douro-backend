import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CultureItem } from './entities/culture-item.entity';
import { CreateCultureItemDto } from './dto/create-culture-item.dto';
import { UpdateCultureItemDto } from './dto/update-culture-item.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class CultureItemsService {
  constructor(
    @InjectRepository(CultureItem)
    private readonly cultureItemRepository: Repository<CultureItem>,
    private readonly translationService: TranslationService,
  ) {}

  async findAll(): Promise<CultureItem[]> {
    return this.cultureItemRepository.find({
      order: { order: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<CultureItem> {
    const item = await this.cultureItemRepository.findOne({ where: { id } });
    if (!item) {
      throw new NotFoundException(`Culture item with ID ${id} not found`);
    }
    return item;
  }

  async create(createDto: CreateCultureItemDto): Promise<CultureItem> {
    let item = this.cultureItemRepository.create(createDto);
    item = await this.cultureItemRepository.save(item);

    // Traduz automaticamente
    await this.translateItem(item);

    return this.findOne(item.id);
  }

  async update(id: string, updateDto: UpdateCultureItemDto): Promise<CultureItem> {
    let item = await this.findOne(id);
    Object.assign(item, updateDto);
    item = await this.cultureItemRepository.save(item);

    // Traduz campos atualizados
    await this.translateItem(item);

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const item = await this.findOne(id);
    await this.cultureItemRepository.remove(item);
  }

  private async translateItem(item: CultureItem): Promise<void> {
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

      await this.cultureItemRepository.save(item);
    } catch (error) {
      console.error('Erro ao traduzir culture item:', error);
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
