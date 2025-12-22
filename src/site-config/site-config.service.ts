import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SiteConfig } from './entities/site-config.entity';
import { UpdateSiteConfigDto } from './dto/update-site-config.dto';

@Injectable()
export class SiteConfigService {
  constructor(
    @InjectRepository(SiteConfig)
    private siteConfigRepository: Repository<SiteConfig>,
  ) {}

  async getConfig(): Promise<SiteConfig> {
    let config = await this.siteConfigRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });

    // Se não existir configuração, cria uma com valores padrão
    if (!config) {
      config = this.siteConfigRepository.create({
        clientesSatisfeitos: 0,
        rating: 0,
        anosExperiencia: 0,
        imoveisVendidos: 0,
      });
      await this.siteConfigRepository.save(config);
    }

    return config;
  }

  async updateConfig(
    updateSiteConfigDto: UpdateSiteConfigDto,
  ): Promise<SiteConfig> {
    const config = await this.getConfig();

    if (updateSiteConfigDto.clientesSatisfeitos !== undefined) {
      config.clientesSatisfeitos = updateSiteConfigDto.clientesSatisfeitos;
    }

    if (updateSiteConfigDto.rating !== undefined) {
      config.rating = updateSiteConfigDto.rating;
    }

    if (updateSiteConfigDto.anosExperiencia !== undefined) {
      config.anosExperiencia = updateSiteConfigDto.anosExperiencia;
    }

    if (updateSiteConfigDto.imoveisVendidos !== undefined) {
      config.imoveisVendidos = updateSiteConfigDto.imoveisVendidos;
    }

    return this.siteConfigRepository.save(config);
  }
}
