import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('podcast_testimonials')
export class PodcastTestimonial {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 255 })
  role_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  role_fr: string;

  @Column({ type: 'text' })
  text_pt: string;

  @Column({ type: 'text', nullable: true })
  text_en: string;

  @Column({ type: 'text', nullable: true })
  text_fr: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
