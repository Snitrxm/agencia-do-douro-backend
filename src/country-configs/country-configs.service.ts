import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryConfig } from './entities/country-config.entity';
import { CreateCountryConfigDto } from './dto/create-country-config.dto';
import { UpdateCountryConfigDto } from './dto/update-country-config.dto';

@Injectable()
export class CountryConfigsService {
  constructor(
    @InjectRepository(CountryConfig)
    private countryConfigRepository: Repository<CountryConfig>,
  ) {}

  async create(dto: CreateCountryConfigDto): Promise<CountryConfig> {
    const existing = await this.countryConfigRepository.findOne({
      where: { code: dto.code.toUpperCase() },
    });

    if (existing) {
      throw new ConflictException(`País com código ${dto.code} já existe`);
    }

    const entity = this.countryConfigRepository.create({
      ...dto,
      code: dto.code.toUpperCase(),
    });

    return this.countryConfigRepository.save(entity);
  }

  async findAll(): Promise<CountryConfig[]> {
    return this.countryConfigRepository.find({
      order: { displayOrder: 'ASC', code: 'ASC' },
    });
  }

  async findOne(code: string): Promise<CountryConfig> {
    const entity = await this.countryConfigRepository.findOne({
      where: { code: code.toUpperCase() },
    });

    if (!entity) {
      throw new NotFoundException(`País com código ${code} não encontrado`);
    }

    return entity;
  }

  async update(code: string, dto: UpdateCountryConfigDto): Promise<CountryConfig> {
    const entity = await this.findOne(code);
    Object.assign(entity, dto);
    return this.countryConfigRepository.save(entity);
  }

  async remove(code: string): Promise<void> {
    const entity = await this.findOne(code);
    await this.countryConfigRepository.remove(entity);
  }
}
