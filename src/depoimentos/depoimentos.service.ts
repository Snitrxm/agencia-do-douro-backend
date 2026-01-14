import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class DepoimentosService {
  constructor(
    @InjectRepository(Depoimento)
    private depoimentoRepository: Repository<Depoimento>,
    private translationService: TranslationService,
  ) {}

  async create(data: CreateDepoimentoDto): Promise<Depoimento> {
    const result = this.depoimentoRepository.create(data);
    const saved = await this.depoimentoRepository.save(result);

    // Traduzir em background
    this.translateItem(saved);

    return saved;
  }

  async findAll(): Promise<Depoimento[]> {
    return this.depoimentoRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async findAllByLocale(locale: string): Promise<any[]> {
    const depoimentos = await this.findAll();

    return depoimentos.map((item) => {
      let text = item.text_pt;

      if (locale === 'en' && item.text_en) {
        text = item.text_en;
      } else if (locale === 'fr' && item.text_fr) {
        text = item.text_fr;
      }

      return {
        id: item.id,
        clientName: item.clientName,
        text,
        createdAt: item.createdAt,
        updatedAt: item.updatedAt,
      };
    });
  }

  async update(
    id: string,
    updateDepoimentoDto: UpdateDepoimentoDto,
  ): Promise<Depoimento> {
    const depoimento = await this.depoimentoRepository.findOne({
      where: { id },
    });

    if (!depoimento) {
      throw new NotFoundException(`Depoimento com ID ${id} não encontrado`);
    }

    Object.assign(depoimento, updateDepoimentoDto);

    const saved = await this.depoimentoRepository.save(depoimento);

    // Re-traduzir se o texto foi atualizado
    if (updateDepoimentoDto.text_pt) {
      this.translateItem(saved);
    }

    return saved;
  }

  async remove(id: string): Promise<void> {
    const depoimento = await this.depoimentoRepository.findOne({
      where: { id },
    });

    if (!depoimento) {
      throw new NotFoundException(`Depoimento com ID ${id} não encontrado`);
    }
    await this.depoimentoRepository.remove(depoimento);
  }

  private async translateItem(item: Depoimento): Promise<void> {
    try {
      const [textEN, textFR] = await Promise.all([
        this.translationService.translate(item.text_pt, 'en-GB'),
        this.translationService.translate(item.text_pt, 'fr'),
      ]);

      item.text_en = textEN;
      item.text_fr = textFR;

      await this.depoimentoRepository.save(item);
    } catch (error) {
      console.error('Erro ao traduzir depoimento:', error);
    }
  }
}
