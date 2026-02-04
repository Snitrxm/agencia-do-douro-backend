import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('podcast_why_listen_cards')
export class PodcastWhyListenCard {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  iconKey: string;

  @Column({ type: 'varchar', length: 255 })
  title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title_fr: string;

  @Column({ type: 'text' })
  subtext_pt: string;

  @Column({ type: 'text', nullable: true })
  subtext_en: string;

  @Column({ type: 'text', nullable: true })
  subtext_fr: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
