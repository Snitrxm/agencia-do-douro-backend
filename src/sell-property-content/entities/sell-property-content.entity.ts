import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('sell_property_content')
export class SellPropertyContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Hero Section
  @Column({ type: 'varchar', length: 100 })
  heroBadge_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  heroBadge_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  heroBadge_fr: string;

  @Column({ type: 'varchar', length: 255 })
  heroTitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  heroTitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  heroTitle_fr: string;

  @Column({ type: 'text' })
  heroDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  heroDescription_en: string;

  @Column({ type: 'text', nullable: true })
  heroDescription_fr: string;

  // Form Section
  @Column({ type: 'varchar', length: 255 })
  formTitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  formTitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  formTitle_fr: string;

  @Column({ type: 'varchar', length: 100 })
  formSubmit_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  formSubmit_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  formSubmit_fr: string;

  // Stats Section
  @Column({ type: 'varchar', length: 100 })
  statsBadge_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsBadge_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsBadge_fr: string;

  @Column({ type: 'varchar', length: 255 })
  statsTitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsTitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsTitle_fr: string;

  @Column({ type: 'text' })
  statsDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  statsDescription_en: string;

  @Column({ type: 'text', nullable: true })
  statsDescription_fr: string;

  // Stats Items
  @Column({ type: 'varchar', length: 100 })
  statsReachLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsReachLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsReachLabel_fr: string;

  @Column({ type: 'varchar', length: 255 })
  statsReachDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsReachDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsReachDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  statsClientsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsClientsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsClientsLabel_fr: string;

  @Column({ type: 'varchar', length: 255 })
  statsClientsDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsClientsDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsClientsDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  statsLocationsLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsLocationsLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsLocationsLabel_fr: string;

  @Column({ type: 'varchar', length: 255 })
  statsLocationsDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsLocationsDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsLocationsDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  statsExperienceLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsExperienceLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  statsExperienceLabel_fr: string;

  @Column({ type: 'varchar', length: 255 })
  statsExperienceDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsExperienceDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  statsExperienceDescription_fr: string;

  // Marketing Section
  @Column({ type: 'varchar', length: 100 })
  marketingBadge_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingBadge_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingBadge_fr: string;

  @Column({ type: 'varchar', length: 255 })
  marketingTitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingTitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingTitle_fr: string;

  @Column({ type: 'text' })
  marketingDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  marketingDescription_en: string;

  @Column({ type: 'text', nullable: true })
  marketingDescription_fr: string;

  // Marketing Channels - Website
  @Column({ type: 'varchar', length: 100 })
  marketingWebsiteTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingWebsiteTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingWebsiteTitle_fr: string;

  @Column({ type: 'varchar', length: 255 })
  marketingWebsiteDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingWebsiteDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingWebsiteDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  marketingWebsiteStat_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingWebsiteStat_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingWebsiteStat_fr: string;

  // Marketing Channels - Newsletter
  @Column({ type: 'varchar', length: 100 })
  marketingNewsletterTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingNewsletterTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingNewsletterTitle_fr: string;

  @Column({ type: 'varchar', length: 255 })
  marketingNewsletterDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingNewsletterDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingNewsletterDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  marketingNewsletterStat_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingNewsletterStat_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingNewsletterStat_fr: string;

  // Marketing Channels - Agencies
  @Column({ type: 'varchar', length: 100 })
  marketingAgenciesTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingAgenciesTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingAgenciesTitle_fr: string;

  @Column({ type: 'varchar', length: 255 })
  marketingAgenciesDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingAgenciesDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingAgenciesDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  marketingAgenciesStat_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingAgenciesStat_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingAgenciesStat_fr: string;

  // Marketing Channels - Media
  @Column({ type: 'varchar', length: 100 })
  marketingMediaTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingMediaTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingMediaTitle_fr: string;

  @Column({ type: 'varchar', length: 255 })
  marketingMediaDescription_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingMediaDescription_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  marketingMediaDescription_fr: string;

  @Column({ type: 'varchar', length: 100 })
  marketingMediaStat_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingMediaStat_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  marketingMediaStat_fr: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
