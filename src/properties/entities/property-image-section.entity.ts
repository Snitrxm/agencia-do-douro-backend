import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('property_image_sections')
export class PropertyImageSection {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @Column({ type: 'varchar', length: 100 })
  sectionName: string;

  @Column({ type: 'json' })
  images: string[];

  @Column({ type: 'int', unsigned: true, default: 0 })
  displayOrder: number;

  @ManyToOne(() => Property, (property) => property.imageSections, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
