import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PodcastContent } from './entities/podcast-content.entity';
import { UpdatePodcastContentDto } from './dto/update-podcast-content.dto';
import { TranslationService } from '../translation/translation.service';

@Injectable()
export class PodcastContentService {
  constructor(
    @InjectRepository(PodcastContent)
    private readonly podcastContentRepository: Repository<PodcastContent>,
    private readonly translationService: TranslationService,
  ) {}

  async get(): Promise<PodcastContent> {
    // Busca o primeiro registro (singleton)
    let content = await this.podcastContentRepository.findOne({
      where: {},
      order: { createdAt: 'ASC' },
    });

    // Se não existir, cria com valores padrão em português
    if (!content) {
      content = this.podcastContentRepository.create({
        headerLabel_pt: 'Conteúdo Exclusivo',
        pageTitle_pt: 'Podcast Norte Imobiliário e Business',
        pageSubtitle_pt: 'Conversas sobre o Mercado Imobiliário de Luxo em Portugal',
        pageDescription_pt: 'Um podcast dedicado a discutir tendências, desafios e oportunidades do mercado imobiliário de luxo em Portugal, com a participação de especialistas e profissionais do setor.',
        topicsLabel_pt: 'Temas & Insights',
        topicsTitle_pt: 'O Que Abordamos',
        episodesLabel_pt: 'Assista Agora',
        episodesTitle_pt: 'Episódios em Destaque',
        episodesDescription_pt: 'Confira os nossos episódios mais assistidos e fique por dentro das conversas que estão a transformar o mercado imobiliário de luxo.',
        episode1Url: 'https://www.youtube.com/watch?v=yjNfYWkTiP0',
        episode1Title_pt: '4ª Temporada – Episódio 2 - ➡️ financiamento habitacional com a Paula Coutinho.',
        episode2Url: 'https://www.youtube.com/watch?v=fHzsVfUTOFg',
        episode2Title_pt: 'Temporada 2ª- episódio 03. Dra. Carolina Carvalho, vistos & cidadania sem enrolação.',
        episode3Url: 'https://www.youtube.com/watch?v=NbOWR3llnVk',
        episode3Title_pt: 'Temporada 3ª- Episódio 02, com Ruben Marques – cofundador do Querido Condomínio',
        episode4Url: 'https://www.youtube.com/watch?v=A6XYFBiICMo',
        episode4Title_pt: 'Temporada 3ª - Episodio 01 Rocha Automóveis - Porto -Portugal',
        episode5Url: 'https://www.youtube.com/watch?v=93GZkfX9U-U',
        episode5Title_pt: '5ª temporada - 2º Episódio - Dra. Renata Dias, médica dentista com formação reconhecida em Portugal.',
        episode6Url: 'https://www.youtube.com/watch?v=wc2neJE36hc',
        episode6Title_pt: 'Temporada 4ª - episódio 01 - Filipe Mello, CEO da ENG&COOP, uma trajetória de sucesso.',
        hostLabel_pt: 'Apresentadora',
        hostName: 'Vânia Fernandes',
        hostDescription_pt: 'Vânia Fernandes é uma profissional reconhecida do setor imobiliário no Norte de Portugal, com mais de 15 anos de experiência em imóveis residenciais e comerciais.',
      });
      content = await this.podcastContentRepository.save(content);

      // Traduz automaticamente
      await this.translateContent(content);
    }

    return content;
  }

  async update(updateDto: UpdatePodcastContentDto): Promise<PodcastContent> {
    let content = await this.get();

    // Atualiza apenas campos fornecidos
    Object.assign(content, updateDto);
    content = await this.podcastContentRepository.save(content);

    // Traduz campos atualizados
    await this.translateContent(content);

    return this.get();
  }

  private async translateContent(content: PodcastContent): Promise<void> {
    const fieldsToTranslate = [
      'headerLabel', 'pageTitle', 'pageSubtitle', 'pageDescription',
      'topicsLabel', 'topicsTitle',
      'episodesLabel', 'episodesTitle', 'episodesDescription',
      'episode1Title', 'episode2Title', 'episode3Title',
      'episode4Title', 'episode5Title', 'episode6Title',
      'hostLabel', 'hostDescription'
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

    await this.podcastContentRepository.save(content);
  }

  // Método para retornar por idioma
  async getByLocale(locale: string = 'pt'): Promise<any> {
    const content = await this.get();
    const transformed: any = {};

    const textFields = [
      'headerLabel', 'pageTitle', 'pageSubtitle', 'pageDescription',
      'topicsLabel', 'topicsTitle',
      'episodesLabel', 'episodesTitle', 'episodesDescription',
      'episode1Title', 'episode2Title', 'episode3Title',
      'episode4Title', 'episode5Title', 'episode6Title',
      'hostLabel', 'hostDescription'
    ];

    textFields.forEach(field => {
      transformed[field] = content[`${field}_${locale}`] || content[`${field}_pt`];
    });

    // Campos não traduzíveis
    transformed.episode1Url = content.episode1Url;
    transformed.episode2Url = content.episode2Url;
    transformed.episode3Url = content.episode3Url;
    transformed.episode4Url = content.episode4Url;
    transformed.episode5Url = content.episode5Url;
    transformed.episode6Url = content.episode6Url;
    transformed.hostName = content.hostName;

    transformed.id = content.id;
    transformed.createdAt = content.createdAt;
    transformed.updatedAt = content.updatedAt;

    // Criar array de episódios para facilitar uso no frontend
    transformed.episodes = [];
    for (let i = 1; i <= 6; i++) {
      const url = content[`episode${i}Url`];
      if (url) {
        transformed.episodes.push({
          id: i.toString(),
          url,
          title: transformed[`episode${i}Title`],
          videoId: this.extractYouTubeVideoId(url),
        });
      }
    }

    return transformed;
  }

  private extractYouTubeVideoId(url: string): string | null {
    if (!url) return null;
    const match = url.match(/(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&\s]+)/);
    return match ? match[1] : null;
  }
}
