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
  pageDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  pageDescription_en: string;

  @Column({ type: 'text', nullable: true })
  pageDescription_fr: string;

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
  @Column({ type: 'varchar', length: 500, nullable: true })
  episode1Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode1Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode1Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode1Title_fr: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  episode2Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode2Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode2Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode2Title_fr: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  episode3Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode3Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode3Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode3Title_fr: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  episode4Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode4Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode4Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode4Title_fr: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  episode5Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode5Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode5Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode5Title_fr: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  episode6Url: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode6Title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode6Title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  episode6Title_fr: string;

  // Seção Apresentadora
  @Column({ type: 'varchar', length: 100 })
  hostLabel_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLabel_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  hostLabel_fr: string;

  @Column({ type: 'varchar', length: 255 })
  hostName: string;

  @Column({ type: 'text' })
  hostDescription_pt: string;

  @Column({ type: 'text', nullable: true })
  hostDescription_en: string;

  @Column({ type: 'text', nullable: true })
  hostDescription_fr: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
