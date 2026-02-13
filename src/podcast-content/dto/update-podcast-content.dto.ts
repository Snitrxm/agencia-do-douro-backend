import { IsString, IsOptional, MinLength, MaxLength } from 'class-validator';

export class UpdatePodcastContentDto {
  // Seção Principal
  @IsOptional()
  @IsString()
  @MaxLength(100)
  headerLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageTitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  pageSubtitle_pt?: string;

  @IsOptional()
  @IsString()
  @MinLength(10)
  pageDescription_pt?: string;

  // Seção About
  @IsOptional()
  @IsString()
  @MaxLength(100)
  aboutLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  aboutTitle_pt?: string;

  @IsOptional()
  @IsString()
  aboutIntro_pt?: string;

  @IsOptional()
  @IsString()
  aboutOrigin_pt?: string;

  @IsOptional()
  @IsString()
  aboutIntention_pt?: string;

  @IsOptional()
  @IsString()
  aboutPresentation_pt?: string;

  // Seção Tópicos
  @IsOptional()
  @IsString()
  @MaxLength(100)
  topicsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  topicsTitle_pt?: string;

  // Seção Episódios
  @IsOptional()
  @IsString()
  @MaxLength(100)
  episodesLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  episodesTitle_pt?: string;

  @IsOptional()
  @IsString()
  episodesDescription_pt?: string;

  // Episódios do YouTube
  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode1Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode1Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode2Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode2Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode3Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode3Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode4Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode4Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode5Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode5Title_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  episode6Url?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  episode6Title_pt?: string;

  // Seção Apresentadora
  @IsOptional()
  @IsString()
  @MaxLength(100)
  hostLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  hostName?: string;

  @IsOptional()
  @IsString()
  hostDescription_pt?: string;

  // Seção Apresentadora - Campos expandidos
  @IsOptional()
  @IsString()
  @MaxLength(255)
  hostCredential_pt?: string;

  @IsOptional()
  @IsString()
  hostParagraph1_pt?: string;

  @IsOptional()
  @IsString()
  hostParagraph2_pt?: string;

  @IsOptional()
  @IsString()
  hostParagraph3_pt?: string;

  @IsOptional()
  @IsString()
  hostQuote_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  hostLinkedInUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  hostLinkedInLabel_pt?: string;

  // Seção Diretor de Produção
  @IsOptional()
  @IsString()
  @MaxLength(100)
  directorLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  directorName?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  directorCredential_pt?: string;

  @IsOptional()
  @IsString()
  directorParagraph1_pt?: string;

  @IsOptional()
  @IsString()
  directorParagraph2_pt?: string;

  @IsOptional()
  @IsString()
  directorParagraph3_pt?: string;

  @IsOptional()
  @IsString()
  directorQuote_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(500)
  directorLinkedInUrl?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  directorLinkedInLabel_pt?: string;

  // Seção Guests Header
  @IsOptional()
  @IsString()
  @MaxLength(100)
  guestsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  guestsTitle_pt?: string;

  // Seção Gallery Header
  @IsOptional()
  @IsString()
  @MaxLength(100)
  galleryLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  galleryTitle_pt?: string;

  @IsOptional()
  @IsString()
  galleryDescription_pt?: string;

  // Seção WhyListen Header
  @IsOptional()
  @IsString()
  @MaxLength(100)
  whyListenLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  whyListenTitle_pt?: string;

  @IsOptional()
  @IsString()
  whyListenSubtitle_pt?: string;

  // Seção Testimonials Header
  @IsOptional()
  @IsString()
  @MaxLength(100)
  testimonialsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  testimonialsTitle_pt?: string;

  @IsOptional()
  @IsString()
  testimonialsSubtitle_pt?: string;

  // Seção CTA Final
  @IsOptional()
  @IsString()
  @MaxLength(100)
  ctaLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  ctaTitle_pt?: string;

  @IsOptional()
  @IsString()
  ctaDescription_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  ctaHint_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(100)
  ctaButtonLabel_pt?: string;

  // Seção Platforms Header
  @IsOptional()
  @IsString()
  @MaxLength(100)
  platformsLabel_pt?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  platformsTitle_pt?: string;

  @IsOptional()
  @IsString()
  platformsDescription_pt?: string;
}
