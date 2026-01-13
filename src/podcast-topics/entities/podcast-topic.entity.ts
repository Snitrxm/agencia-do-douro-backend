import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('podcast_topics')
export class PodcastTopic {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title_fr: string;

  @Column({ type: 'text' })
  description_pt: string;

  @Column({ type: 'text', nullable: true })
  description_en: string;

  @Column({ type: 'text', nullable: true })
  description_fr: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
