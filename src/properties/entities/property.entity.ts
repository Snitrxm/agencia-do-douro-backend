import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
} from 'typeorm';
import { PropertyImageSection } from './property-image-section.entity';
import { Newsletter } from '../../newsletters/entities/newsletter.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  reference: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({
    type: 'enum',
    enum: ['comprar', 'arrendar', 'vender'],
    default: 'comprar',
  })
  transactionType: string;

  @Column({
    type: 'varchar',
    length: 100,
  })
  propertyType: string;

  @Column({ type: 'boolean', default: false })
  isEmpreendimento: boolean;

  @Column({
    type: 'enum',
    enum: ['novo', 'usado', 'renovado'],
    nullable: true,
  })
  propertyState: string;

  @Column({ type: 'varchar', length: 10, nullable: true })
  energyClass: string;

  @Column({ type: 'decimal', precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  totalArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  builtArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  usefulArea: number;

  @Column({ type: 'int', unsigned: true })
  bedrooms: number;

  @Column({ type: 'int', unsigned: true })
  bathrooms: number;

  @Column({ type: 'boolean', default: false })
  hasOffice: boolean;

  @Column({ type: 'boolean', default: false })
  hasLaundry: boolean;

  @Column({ type: 'int', unsigned: true, default: 0 })
  garageSpaces: number;

  @Column({ type: 'int', nullable: true })
  constructionYear: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  deliveryDate: string;

  // Location fields for Portuguese market
  @Column({ type: 'varchar', length: 100 })
  distrito: string;

  @Column({ type: 'varchar', length: 100 })
  concelho: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'text', nullable: true })
  paymentConditions: string;

  @Column({ type: 'json', nullable: true })
  features: string[];

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'sold', 'rented'],
    default: 'active',
  })
  status: string;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;

  @OneToMany(
    () => PropertyImageSection,
    (imageSection) => imageSection.property,
    { cascade: true },
  )
  imageSections: PropertyImageSection[];

  @ManyToMany(() => Newsletter, (newsletter) => newsletter.properties)
  newsletters: Newsletter[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
