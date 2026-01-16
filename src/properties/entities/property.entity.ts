import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToMany,
  ManyToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { PropertyImageSection } from './property-image-section.entity';
import { PropertyFile } from './property-file.entity';
import { Newsletter } from '../../newsletters/entities/newsletter.entity';
import { TeamMember } from '../../team-members/entities/team-member.entity';

@Entity('properties')
export class Property {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  reference: string;

  // Multilingual fields - Portuguese is the source language
  @Column({ type: 'varchar', length: 255 })
  title_pt: string;

  @Column({ type: 'text' })
  description_pt: string;

  // Auto-translated fields (can be implemented later with OpenAI/DeepL)
  @Column({ type: 'varchar', length: 255, nullable: true })
  title_en: string;

  @Column({ type: 'text', nullable: true })
  description_en: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  title_fr: string;

  @Column({ type: 'text', nullable: true })
  description_fr: string;

  @Column({
    type: 'enum',
    enum: ['comprar', 'arrendar', 'trespasse'],
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

  // Country code - ISO 3166-1 alpha-2 (PT, ES, FR, etc.)
  @Column({ type: 'varchar', length: 2, default: 'PT' })
  country: string;

  // Location fields for Portuguese market (nullable for non-PT countries)
  @Column({ type: 'varchar', length: 100, nullable: true })
  distrito: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  concelho: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  freguesia: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  address: string;

  // Generic location fields (for all countries - normalized)
  @Column({ type: 'varchar', length: 100, nullable: true })
  region: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  city: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'text', nullable: true })
  paymentConditions_pt: string;

  @Column({ type: 'text', nullable: true })
  paymentConditions_en: string;

  @Column({ type: 'text', nullable: true })
  paymentConditions_fr: string;

  @Column({ type: 'text', nullable: true })
  features: string;

  @Column({ type: 'text', nullable: true })
  whyChoose: string;

  @Column({
    type: 'enum',
    enum: ['active', 'inactive', 'sold', 'rented', 'reserved'],
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

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'property_related_properties',
    joinColumn: { name: 'property_id', referencedColumnName: 'id' },
    inverseJoinColumn: {
      name: 'related_property_id',
      referencedColumnName: 'id',
    },
  })
  relatedProperties: Property[];

  @OneToMany(() => PropertyFile, (file) => file.property, { cascade: true })
  files: PropertyFile[];

  @ManyToOne(() => TeamMember, { nullable: true })
  @JoinColumn({ name: 'team_member_id' })
  teamMember: TeamMember;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
