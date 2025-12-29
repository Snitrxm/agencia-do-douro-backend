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

    // Atualiza automaticamente apenas os campos que foram enviados no DTO
    Object.keys(updateSiteConfigDto).forEach((key) => {
      if (updateSiteConfigDto[key] !== undefined) {
        config[key] = updateSiteConfigDto[key];
      }
    });

    return this.siteConfigRepository.save(config);
  }
}
