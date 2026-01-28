import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { Property } from './property.entity';

@Entity('property_fractions')
export class PropertyFraction {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.fractions, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  // Campos multilíngues - Natureza
  @Column({ type: 'varchar', length: 100, nullable: true })
  nature_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nature_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  nature_fr: string;

  // Campos multilíngues - Tipologia
  @Column({ type: 'varchar', length: 50, nullable: true })
  fractionType_pt: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  fractionType_en: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  fractionType_fr: string;

  // Campos multilíngues - Piso
  @Column({ type: 'varchar', length: 50, nullable: true })
  floor_pt: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  floor_en: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  floor_fr: string;

  // Campos multilíngues - Fração/Unidade
  @Column({ type: 'varchar', length: 50, nullable: true })
  unit_pt: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit_en: string;

  @Column({ type: 'varchar', length: 50, nullable: true })
  unit_fr: string;

  // Campos numéricos
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  grossArea: number;

  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  outdoorArea: number;

  @Column({ type: 'int', unsigned: true, default: 0 })
  parkingSpaces: number;

  @Column({ type: 'decimal', precision: 12, scale: 2, nullable: true })
  price: number;

  // Campo URL - Link para PDF da planta
  @Column({ type: 'varchar', length: 500, nullable: true })
  floorPlan: string;

  // Status de reserva
  @Column({
    type: 'enum',
    enum: ['available', 'reserved', 'sold'],
    default: 'available',
  })
  reservationStatus: string;

  // Ordem de exibição
  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  // Dados personalizados (JSON) para colunas customizadas
  @Column({ type: 'json', nullable: true })
  customData: Record<string, any>;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
