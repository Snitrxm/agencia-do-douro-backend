import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DesiredZone } from './entities/desired-zone.entity';
import { CreateDesiredZoneDto } from './dto/create-desired-zone.dto';
import { UpdateDesiredZoneDto } from './dto/update-desired-zone.dto';

@Injectable()
export class DesiredZonesService {
  constructor(
    @InjectRepository(DesiredZone)
    private desiredZoneRepository: Repository<DesiredZone>,
  ) {}

  async create(createDesiredZoneDto: CreateDesiredZoneDto): Promise<DesiredZone> {
    const desiredZone = this.desiredZoneRepository.create(createDesiredZoneDto);
    return this.desiredZoneRepository.save(desiredZone);
  }

  async findAll(): Promise<DesiredZone[]> {
    return this.desiredZoneRepository.find({
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findActive(country?: string): Promise<DesiredZone[]> {
    const where: { isActive: boolean; country?: string } = { isActive: true };
    
    if (country) {
      where.country = country;
    }

    return this.desiredZoneRepository.find({
      where,
      order: { displayOrder: 'ASC', createdAt: 'ASC' },
    });
  }

  async findOne(id: string): Promise<DesiredZone> {
    const desiredZone = await this.desiredZoneRepository.findOne({
      where: { id },
    });

    if (!desiredZone) {
      throw new NotFoundException(`Desired zone with ID ${id} not found`);
    }

    return desiredZone;
  }

  async update(
    id: string,
    updateDesiredZoneDto: UpdateDesiredZoneDto,
  ): Promise<DesiredZone> {
    const desiredZone = await this.findOne(id);

    Object.assign(desiredZone, updateDesiredZoneDto);

    return this.desiredZoneRepository.save(desiredZone);
  }

  async remove(id: string): Promise<void> {
    const desiredZone = await this.findOne(id);
    await this.desiredZoneRepository.remove(desiredZone);
  }
}
