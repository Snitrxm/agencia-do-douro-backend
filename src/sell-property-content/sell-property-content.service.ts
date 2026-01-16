import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellPropertyContent } from './entities/sell-property-content.entity';
import { UpdateSellPropertyContentDto } from './dto/update-sell-property-content.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class SellPropertyContentService {
  constructor(
    @InjectRepository(SellPropertyContent)
    private readonly sellPropertyContentRepository: Repository<SellPropertyContent>,
    private readonly translationService: TranslationService,
  ) {}

  async get(): Promise<SellPropertyContent> {
    // Busca o primeiro registro (singleton)
    let content = await this.sellPropertyContentRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });

    // Se não existir, cria com valores padrão em português
    if (!content) {
      content = this.sellPropertyContentRepository.create({
        // Hero Section
        heroBadge_pt: 'Vender o seu imóvel',
        heroTitle_pt: 'Solicite uma avaliação gratuita do seu imóvel',
        heroDescription_pt: 'A nossa equipa de especialistas está pronta para avaliar o seu imóvel e ajudá-lo a obter o melhor valor no mercado. Preencha o formulário e receba uma avaliação profissional sem compromisso.',
        
        // Form Section
        formTitle_pt: 'Descreva o seu imóvel',
        formSubmit_pt: 'Solicitar Avaliação',
        
        // Stats Section
        statsBadge_pt: 'O nosso alcance',
        statsTitle_pt: 'Uma rede global ao seu serviço',
        statsDescription_pt: 'A Agência Douro faz parte de uma rede imobiliária de excelência, garantindo que o seu imóvel chegue aos compradores certos em Portugal e no mundo.',
        
        // Stats Items
        statsReachLabel_pt: 'Alcance Global',
        statsReachDescription_pt: 'Presença em múltiplos países e continentes',
        statsClientsLabel_pt: 'Clientes Ativos',
        statsClientsDescription_pt: 'Base de clientes qualificados e interessados',
        statsLocationsLabel_pt: 'Localizações',
        statsLocationsDescription_pt: 'Cobertura em Portugal e internacional',
        statsExperienceLabel_pt: 'Anos de Experiência',
        statsExperienceDescription_pt: 'Conhecimento profundo do mercado',
        
        // Marketing Section
        marketingBadge_pt: 'Como promovemos',
        marketingTitle_pt: 'Canais de promoção do seu imóvel',
        marketingDescription_pt: 'Utilizamos uma estratégia de marketing multicanal para garantir a máxima exposição do seu imóvel aos potenciais compradores.',
        
        // Marketing Channels - Website
        marketingWebsiteTitle_pt: 'Website',
        marketingWebsiteDescription_pt: 'Divulgação no nosso portal imobiliário de alta qualidade',
        marketingWebsiteStat_pt: '+50.000 visitantes/mês',
        
        // Marketing Channels - Newsletter
        marketingNewsletterTitle_pt: 'Newsletter',
        marketingNewsletterDescription_pt: 'Envio para a nossa base de clientes qualificados',
        marketingNewsletterStat_pt: '+10.000 subscritores',
        
        // Marketing Channels - Agencies
        marketingAgenciesTitle_pt: 'Agências Parceiras',
        marketingAgenciesDescription_pt: 'Exposição em vitrinas e escritórios',
        marketingAgenciesStat_pt: 'Rede de parceiros',
        
        // Marketing Channels - Media
        marketingMediaTitle_pt: 'Redes Sociais',
        marketingMediaDescription_pt: 'Divulgação nas principais plataformas digitais',
        marketingMediaStat_pt: 'Alto engagement',
      });
      content = await this.sellPropertyContentRepository.save(content);

      // Traduz automaticamente
      await this.translateContent(content);
    }

    return content;
  }

  async update(updateDto: UpdateSellPropertyContentDto): Promise<SellPropertyContent> {
    let content = await this.get();

    // Atualiza apenas campos fornecidos
    Object.assign(content, updateDto);
    content = await this.sellPropertyContentRepository.save(content);

    // Traduz campos atualizados
    await this.translateContent(content);

    return this.get();
  }

  private async translateContent(content: SellPropertyContent): Promise<void> {
    const fieldsToTranslate = [
      'heroBadge', 'heroTitle', 'heroDescription',
      'formTitle', 'formSubmit',
      'statsBadge', 'statsTitle', 'statsDescription',
      'statsReachLabel', 'statsReachDescription',
      'statsClientsLabel', 'statsClientsDescription',
      'statsLocationsLabel', 'statsLocationsDescription',
      'statsExperienceLabel', 'statsExperienceDescription',
      'marketingBadge', 'marketingTitle', 'marketingDescription',
      'marketingWebsiteTitle', 'marketingWebsiteDescription', 'marketingWebsiteStat',
      'marketingNewsletterTitle', 'marketingNewsletterDescription', 'marketingNewsletterStat',
      'marketingAgenciesTitle', 'marketingAgenciesDescription', 'marketingAgenciesStat',
      'marketingMediaTitle', 'marketingMediaDescription', 'marketingMediaStat',
    ];

    for (const field of fieldsToTranslate) {
      const ptValue = content[`${field}_pt`];

      if (ptValue) {
        try {
          const [translatedEN, translatedFR] = await Promise.all([
            this.translationService.translate(ptValue, 'en-GB'),
            this.translationService.translate(ptValue, 'fr'),
          ]);

          content[`${field}_en`] = translatedEN;
          content[`${field}_fr`] = translatedFR;
        } catch (error) {
          console.error(`Erro ao traduzir ${field}:`, error);
          // Continua sem bloquear
        }
      }
    }

    await this.sellPropertyContentRepository.save(content);
  }

  // Método para retornar por idioma
  async getByLocale(locale: string = 'pt'): Promise<any> {
    const content = await this.get();
    const transformed: any = {};

    const textFields = [
      'heroBadge', 'heroTitle', 'heroDescription',
      'formTitle', 'formSubmit',
      'statsBadge', 'statsTitle', 'statsDescription',
      'statsReachLabel', 'statsReachDescription',
      'statsClientsLabel', 'statsClientsDescription',
      'statsLocationsLabel', 'statsLocationsDescription',
      'statsExperienceLabel', 'statsExperienceDescription',
      'marketingBadge', 'marketingTitle', 'marketingDescription',
      'marketingWebsiteTitle', 'marketingWebsiteDescription', 'marketingWebsiteStat',
      'marketingNewsletterTitle', 'marketingNewsletterDescription', 'marketingNewsletterStat',
      'marketingAgenciesTitle', 'marketingAgenciesDescription', 'marketingAgenciesStat',
      'marketingMediaTitle', 'marketingMediaDescription', 'marketingMediaStat',
    ];

    textFields.forEach(field => {
      transformed[field] = content[`${field}_${locale}`] || content[`${field}_pt`];
    });

    transformed.id = content.id;
    transformed.createdAt = content.createdAt;
    transformed.updatedAt = content.updatedAt;

    return transformed;
  }
}
