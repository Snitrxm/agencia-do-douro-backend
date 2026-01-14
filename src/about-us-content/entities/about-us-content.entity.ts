import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity('about_us_content')
export class AboutUsContent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  // Textos principais (PT = fonte, EN/FR = traduzidos)
  @Column({ type: 'varchar', length: 255 })
  pageTitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pageTitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pageTitle_fr: string;

  @Column({ type: 'varchar', length: 255 })
  pageSubtitle_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pageSubtitle_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  pageSubtitle_fr: string;

  @Column({ type: 'text' })
  description1_pt: string;

  @Column({ type: 'text', nullable: true })
  description1_en: string;

  @Column({ type: 'text', nullable: true })
  description1_fr: string;

  @Column({ type: 'text' })
  description2_pt: string;

  @Column({ type: 'text', nullable: true })
  description2_en: string;

  @Column({ type: 'text', nullable: true })
  description2_fr: string;

  // Labels de seções
  @Column({ type: 'varchar', length: 100 })
  cultureLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cultureLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cultureLabel_fr: string;

  @Column({ type: 'varchar', length: 100 })
  cultureTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cultureTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  cultureTitle_fr: string;

  @Column({ type: 'varchar', length: 100 })
  servicesLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  servicesLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  servicesLabel_fr: string;

  @Column({ type: 'varchar', length: 100 })
  servicesTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  servicesTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  servicesTitle_fr: string;

  @Column({ type: 'varchar', length: 100 })
  teamLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  teamLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  teamLabel_fr: string;

  @Column({ type: 'varchar', length: 100 })
  teamTitle_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  teamTitle_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  teamTitle_fr: string;

  @Column({ type: 'text' })
  teamDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  teamDescription_en: string;

  @Column({ type: 'text', nullable: true })
  teamDescription_fr: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
