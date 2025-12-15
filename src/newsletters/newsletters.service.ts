import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Newsletter } from './entities/newsletter.entity';
import { CreateNewsletterDto } from './dto/create-newsletter.dto';
import { UpdateNewsletterDto } from './dto/update-newsletter.dto';
import { Property } from '../properties/entities/property.entity';

@Injectable()
export class NewslettersService {
  constructor(
    @InjectRepository(Newsletter)
    private newsletterRepository: Repository<Newsletter>,
    @InjectRepository(Property)
    private propertyRepository: Repository<Property>,
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

    // Busca os imóveis se IDs foram fornecidos
    let properties: Property[] = [];
    if (createNewsletterDto.propertyIds && createNewsletterDto.propertyIds.length > 0) {
      properties = await this.propertyRepository.find({
        where: { id: In(createNewsletterDto.propertyIds) },
      });
    }

    // Cria a newsletter
    const newsletter = this.newsletterRepository.create({
      title: createNewsletterDto.title,
      content: createNewsletterDto.content,
      category: createNewsletterDto.category,
      coverImage: createNewsletterDto.coverImage,
      readingTime,
      properties,
    });

    return this.newsletterRepository.save(newsletter);
  }

  async findAll(): Promise<Newsletter[]> {
    return this.newsletterRepository.find({
      relations: ['properties'],
      order: {
        createdAt: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Newsletter> {
    const newsletter = await this.newsletterRepository.findOne({
      where: { id },
      relations: ['properties'],
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

    // Atualiza os imóveis se IDs foram fornecidos
    if (updateNewsletterDto.propertyIds !== undefined) {
      if (updateNewsletterDto.propertyIds.length > 0) {
        newsletter.properties = await this.propertyRepository.find({
          where: { id: In(updateNewsletterDto.propertyIds) },
        });
      } else {
        newsletter.properties = [];
      }
    }

    // Atualiza os campos
    if (updateNewsletterDto.title !== undefined) {
      newsletter.title = updateNewsletterDto.title;
    }
    if (updateNewsletterDto.content !== undefined) {
      newsletter.content = updateNewsletterDto.content;
    }
    if (updateNewsletterDto.category !== undefined) {
      newsletter.category = updateNewsletterDto.category;
    }
    if (updateNewsletterDto.coverImage !== undefined) {
      newsletter.coverImage = updateNewsletterDto.coverImage;
    }

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
