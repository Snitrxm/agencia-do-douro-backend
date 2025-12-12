import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Newsletter } from './entities/newsletter.entity';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository: Repository<Newsletter>,
  ) {}

  private calculateReadingTime(content: string): number {
    // Remove HTML tags
    const textOnly = content.replace(/<[^>]*>/g, ' ');

    // Remove espaços extras e quebra em palavras
    const words = textOnly
      .trim()
      .split(/\s+/)
      .filter((word) => word.length > 0);

    // Calcula tempo (200 palavras por minuto)
    const minutes = Math.ceil(words.length / 200);

    return Math.max(1, minutes); // Mínimo 1 minuto
  }

  async create(
    createNewsletterDto: CreateNewsletterDto,
  ): Promise<Newsletter> {
    // Calcula o tempo de leitura automaticamente
    const readingTime = this.calculateReadingTime(
      createNewsletterDto.content,
    );

    // Cria a newsletter
    const newsletter = this.newsletterRepository.create({
      ...createNewsletterDto,
      readingTime,
    });

    return this.newsletterRepository.save(newsletter);
  }

  async findAll(): Promise<Newsletter[]> {
    return this.newsletterRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Newsletter> {
    const newsletter = await this.newsletterRepository.findOne({
      where: { id },
    });

    if (!newsletter) {
      throw new NotFoundException(`Newsletter com ID ${id} não encontrada`);
    }

    return newsletter;
  }

  async update(
    id: string,
    updateNewsletterDto: UpdateNewsletterDto,
  ): Promise<Newsletter> {
    const newsletter = await this.findOne(id);

    // Atualiza os campos
    Object.assign(newsletter, updateNewsletterDto);

    // Recalcula o tempo de leitura se o conteúdo foi alterado
    if (
      'content' in updateNewsletterDto &&
      typeof updateNewsletterDto.content === 'string'
    ) {
      newsletter.readingTime = this.calculateReadingTime(
        updateNewsletterDto.content,
      );
    }

    return this.newsletterRepository.save(newsletter);
  }

  async remove(id: string): Promise<Newsletter> {
    const newsletter = await this.findOne(id);
    await this.newsletterRepository.remove(newsletter);
    return newsletter;
  }
}
