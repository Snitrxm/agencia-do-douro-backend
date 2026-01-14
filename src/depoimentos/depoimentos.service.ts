import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Depoimento } from './entities/depoimento.entity';
import { CreateDepoimentoDto } from './dto/create-depoimento.dto';
import { UpdateDepoimentoDto } from './dto/update-depoimento.dto';

@Injectable()
export class DepoimentosService {
  constructor(
    @InjectRepository(Depoimento)
    private depoimentoRepository: Repository<Depoimento>,
  ) {}

  async create(data: CreateDepoimentoDto): Promise<Depoimento> {
    const result = this.depoimentoRepository.create(data);
    return this.depoimentoRepository.save(result);
  }

  async findAll(): Promise<Depoimento[]> {
    return this.depoimentoRepository.find({
      order: { createdAt: 'ASC' },
    });
  }

  async update(
    id: string,
    updateDesiredZoneDto: UpdateDepoimentoDto,
  ): Promise<Depoimento> {
    const depoimento = await this.depoimentoRepository.findOne({
      where: { id },
    });

    if (!depoimento) {
      throw new NotFoundException(`Depoimento com ID ${id} não encontrado`);
    }

    Object.assign(depoimento, updateDesiredZoneDto);

    return this.depoimentoRepository.save(depoimento);
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
}
