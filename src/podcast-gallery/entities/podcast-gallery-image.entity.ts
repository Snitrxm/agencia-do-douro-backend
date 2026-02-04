import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export type MediaType = 'image' | 'video';

@Entity('podcast_gallery_images')
export class PodcastGalleryImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'enum', enum: ['image', 'video'], default: 'image' })
  mediaType: MediaType;

  @Column({ type: 'varchar', length: 500 })
  imageUrl: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  videoUrl: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_pt: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  alt_fr: string;

  @Column({ type: 'int', default: 0 })
  order: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
