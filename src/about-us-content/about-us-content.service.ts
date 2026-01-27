import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AboutUsContent } from './entities/about-us-content.entity';
import { UpdateAboutUsContentDto } from './dto/update-about-us-content.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class AboutUsContentService {
  constructor(
    @InjectRepository(AboutUsContent)
    private readonly aboutUsContentRepository: Repository<AboutUsContent>,
    private readonly translationService: TranslationService,
  ) {}

  async get(): Promise<AboutUsContent> {
    // Busca o primeiro registro (singleton)
    let content = await this.aboutUsContentRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });

    // Se não existir, cria com valores padrão em português
    if (!content) {
      content = this.aboutUsContentRepository.create({
        pageTitle_pt: 'Sobre Nós',
        pageSubtitle_pt: 'Especialistas em Imóveis de Luxo em Portugal',
        description1_pt: 'Na Agência Douro, a nossa missão é transformar sonhos em realidade, sempre com um compromisso inabalável com a transparência e a responsabilidade. A nossa equipa é composta por profissionais altamente qualificados, prontos para o ajudar a realizar o sonho da sua vida.',
        description2_pt: 'A atuar no mercado nacional e internacional, a Agência Douro é reconhecida pela sua transparência, responsabilidade e compromisso em proporcionar tranquilidade em cada transação. Seja para habitação própria ou para investimento, oferecemos um apoio completo para garantir que o seu negócio seja seguro e eficaz.',
        cultureLabel_pt: 'Nossa Identidade',
        cultureTitle_pt: 'A Nossa Cultura',
        servicesLabel_pt: 'O Que Oferecemos',
        servicesTitle_pt: 'Os Nossos Serviços',
        teamLabel_pt: 'Conheça a Nossa Equipa',
        teamTitle_pt: 'A Nossa Equipa',
        teamDescription_pt: 'A nossa equipa é composta por profissionais altamente qualificados e experientes, dedicados a proporcionar o melhor serviço e a transformar os seus sonhos em realidade.',
        televisionLabel_pt: 'Na Televisão',
        televisionTitle_pt: 'Veja-nos na Televisão',
        televisionDescription_pt: 'Confira as nossas aparições e entrevistas em programas de televisão.',
      });
      content = await this.aboutUsContentRepository.save(content);

      // Traduz automaticamente
      await this.translateContent(content);
    }

    return content;
  }

  async update(updateDto: UpdateAboutUsContentDto): Promise<AboutUsContent> {
    let content = await this.get();

    // Atualiza apenas campos fornecidos
    Object.assign(content, updateDto);
    content = await this.aboutUsContentRepository.save(content);

    // Traduz campos atualizados
    await this.translateContent(content);

    return this.get();
  }

  private async translateContent(content: AboutUsContent): Promise<void> {
    const fieldsToTranslate = [
      'pageTitle', 'pageSubtitle', 'description1', 'description2',
      'cultureLabel', 'cultureTitle', 'servicesLabel', 'servicesTitle',
      'teamLabel', 'teamTitle', 'teamDescription',
      'televisionLabel', 'televisionTitle', 'televisionDescription'
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

    await this.aboutUsContentRepository.save(content);
  }

  // Método para retornar por idioma
  async getByLocale(locale: string = 'pt'): Promise<any> {
    const content = await this.get();
    const transformed: any = {};

    const fields = [
      'pageTitle', 'pageSubtitle', 'description1', 'description2',
      'cultureLabel', 'cultureTitle', 'servicesLabel', 'servicesTitle',
      'teamLabel', 'teamTitle', 'teamDescription',
      'televisionLabel', 'televisionTitle', 'televisionDescription'
    ];

    fields.forEach(field => {
      transformed[field] = content[`${field}_${locale}`] || content[`${field}_pt`];
    });

    // Adicionar links do YouTube (não dependem de locale)
    transformed.youtubeLink1 = content.youtubeLink1;
    transformed.youtubeLink2 = content.youtubeLink2;
    transformed.youtubeLink3 = content.youtubeLink3;

    transformed.id = content.id;
    transformed.createdAt = content.createdAt;
    transformed.updatedAt = content.updatedAt;

    return transformed;
  }
}
