import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('podcast_content')
export class PodcastContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Seção Principal - Apresentação do Podcast
  @Column({ type: 'varchar', length: 100 })
  headerLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  headerLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  headerLabel_fr: string;

  @Column({ type: 'text' })
  pageTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  pageTitle_en: string;

  @Column({ type: 'text', nullable: true })
  pageTitle_fr: string;

  @Column({ type: 'text' })
  pageSubtitle_pt: string;

  @Column({ type: 'text', nullable: true })
  pageSubtitle_en: string;

  @Column({ type: 'text', nullable: true })
  pageSubtitle_fr: string;

  @Column({ type: 'text' })
  pageDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  pageDescription_en: string;

  @Column({ type: 'text', nullable: true })
  pageDescription_fr: string;

  // Seção About
  @Column({ type: 'varchar', length: 100, nullable: true })
  aboutLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  aboutLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  aboutLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  aboutTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  aboutTitle_en: string;

  @Column({ type: 'text', nullable: true })
  aboutTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  aboutIntro_pt: string;

  @Column({ type: 'text', nullable: true })
  aboutIntro_en: string;

  @Column({ type: 'text', nullable: true })
  aboutIntro_fr: string;

  @Column({ type: 'text', nullable: true })
  aboutOrigin_pt: string;

  @Column({ type: 'text', nullable: true })
  aboutOrigin_en: string;

  @Column({ type: 'text', nullable: true })
  aboutOrigin_fr: string;

  @Column({ type: 'text', nullable: true })
  aboutIntention_pt: string;

  @Column({ type: 'text', nullable: true })
  aboutIntention_en: string;

  @Column({ type: 'text', nullable: true })
  aboutIntention_fr: string;

  @Column({ type: 'text', nullable: true })
  aboutPresentation_pt: string;

  @Column({ type: 'text', nullable: true })
  aboutPresentation_en: string;

  @Column({ type: 'text', nullable: true })
  aboutPresentation_fr: string;

  // Seção "O Que Abordamos"
  @Column({ type: 'varchar', length: 100 })
  topicsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  topicsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  topicsLabel_fr: string;

  @Column({ type: 'varchar', length: 100 })
  topicsTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  topicsTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  topicsTitle_fr: string;

  // Seção Episódios
  @Column({ type: 'varchar', length: 100 })
  episodesLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  episodesLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  episodesLabel_fr: string;

  @Column({ type: 'varchar', length: 100 })
  episodesTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  episodesTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  episodesTitle_fr: string;

  @Column({ type: 'text' })
  episodesDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  episodesDescription_en: string;

  @Column({ type: 'text', nullable: true })
  episodesDescription_fr: string;

  // Episódios do YouTube (até 6 episódios)
  @Column({ type: 'text', nullable: true })
  episode1Url: string;

  @Column({ type: 'text', nullable: true })
  episode1Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode1Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode1Title_fr: string;

  @Column({ type: 'text', nullable: true })
  episode2Url: string;

  @Column({ type: 'text', nullable: true })
  episode2Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode2Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode2Title_fr: string;

  @Column({ type: 'text', nullable: true })
  episode3Url: string;

  @Column({ type: 'text', nullable: true })
  episode3Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode3Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode3Title_fr: string;

  @Column({ type: 'text', nullable: true })
  episode4Url: string;

  @Column({ type: 'text', nullable: true })
  episode4Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode4Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode4Title_fr: string;

  @Column({ type: 'text', nullable: true })
  episode5Url: string;

  @Column({ type: 'text', nullable: true })
  episode5Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode5Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode5Title_fr: string;

  @Column({ type: 'text', nullable: true })
  episode6Url: string;

  @Column({ type: 'text', nullable: true })
  episode6Title_pt: string;

  @Column({ type: 'text', nullable: true })
  episode6Title_en: string;

  @Column({ type: 'text', nullable: true })
  episode6Title_fr: string;

  // Seção Apresentadora
  @Column({ type: 'varchar', length: 100 })
  hostLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLabel_fr: string;

  @Column({ type: 'text' })
  hostName: string;

  @Column({ type: 'text' })
  hostDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  hostDescription_en: string;

  @Column({ type: 'text', nullable: true })
  hostDescription_fr: string;

  // Seção Apresentadora - Campos expandidos
  @Column({ type: 'text', nullable: true })
  hostCredential_pt: string;

  @Column({ type: 'text', nullable: true })
  hostCredential_en: string;

  @Column({ type: 'text', nullable: true })
  hostCredential_fr: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph1_pt: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph1_en: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph1_fr: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph2_pt: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph2_en: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph2_fr: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph3_pt: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph3_en: string;

  @Column({ type: 'text', nullable: true })
  hostParagraph3_fr: string;

  @Column({ type: 'text', nullable: true })
  hostQuote_pt: string;

  @Column({ type: 'text', nullable: true })
  hostQuote_en: string;

  @Column({ type: 'text', nullable: true })
  hostQuote_fr: string;

  @Column({ type: 'text', nullable: true })
  hostLinkedInUrl: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLinkedInLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLinkedInLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLinkedInLabel_fr: string;

  // Seção Guests Header
  @Column({ type: 'varchar', length: 100, nullable: true })
  guestsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  guestsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  guestsLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  guestsTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  guestsTitle_en: string;

  @Column({ type: 'text', nullable: true })
  guestsTitle_fr: string;

  // Seção Gallery Header
  @Column({ type: 'varchar', length: 100, nullable: true })
  galleryLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  galleryLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  galleryLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  galleryTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  galleryTitle_en: string;

  @Column({ type: 'text', nullable: true })
  galleryTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  galleryDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  galleryDescription_en: string;

  @Column({ type: 'text', nullable: true })
  galleryDescription_fr: string;

  // Seção WhyListen Header
  @Column({ type: 'varchar', length: 100, nullable: true })
  whyListenLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  whyListenLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  whyListenLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  whyListenTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  whyListenTitle_en: string;

  @Column({ type: 'text', nullable: true })
  whyListenTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  whyListenSubtitle_pt: string;

  @Column({ type: 'text', nullable: true })
  whyListenSubtitle_en: string;

  @Column({ type: 'text', nullable: true })
  whyListenSubtitle_fr: string;

  // Seção Testimonials Header
  @Column({ type: 'varchar', length: 100, nullable: true })
  testimonialsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  testimonialsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  testimonialsLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  testimonialsTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  testimonialsTitle_en: string;

  @Column({ type: 'text', nullable: true })
  testimonialsTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  testimonialsSubtitle_pt: string;

  @Column({ type: 'text', nullable: true })
  testimonialsSubtitle_en: string;

  @Column({ type: 'text', nullable: true })
  testimonialsSubtitle_fr: string;

  // Seção CTA Final
  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  ctaTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  ctaTitle_en: string;

  @Column({ type: 'text', nullable: true })
  ctaTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  ctaDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  ctaDescription_en: string;

  @Column({ type: 'text', nullable: true })
  ctaDescription_fr: string;

  @Column({ type: 'text', nullable: true })
  ctaHint_pt: string;

  @Column({ type: 'text', nullable: true })
  ctaHint_en: string;

  @Column({ type: 'text', nullable: true })
  ctaHint_fr: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaButtonLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaButtonLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  ctaButtonLabel_fr: string;

  // Seção Platforms Header
  @Column({ type: 'varchar', length: 100, nullable: true })
  platformsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  platformsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  platformsLabel_fr: string;

  @Column({ type: 'text', nullable: true })
  platformsTitle_pt: string;

  @Column({ type: 'text', nullable: true })
  platformsTitle_en: string;

  @Column({ type: 'text', nullable: true })
  platformsTitle_fr: string;

  @Column({ type: 'text', nullable: true })
  platformsDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  platformsDescription_en: string;

  @Column({ type: 'text', nullable: true })
  platformsDescription_fr: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
