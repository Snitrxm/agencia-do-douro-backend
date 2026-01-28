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

@Entity('property_fraction_columns')
export class PropertyFractionColumn {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'uuid' })
  propertyId: string;

  @ManyToOne(() => Property, (property) => property.fractionColumns, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'propertyId' })
  property: Property;

  // Chave única da coluna (ex: 'nature', 'fractionType', 'custom_1')
  @Column({ type: 'varchar', length: 100 })
  columnKey: string;

  // Labels multilíngues
  @Column({ type: 'varchar', length: 100 })
  label_pt: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  label_en: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  label_fr: string;

  // Tipo de dados da coluna
  @Column({
    type: 'enum',
    enum: ['text', 'number', 'currency', 'area', 'select'],
    default: 'text',
  })
  dataType: string;

  // Opções para tipo 'select' (JSON array)
  @Column({ type: 'json', nullable: true })
  selectOptions: string[];

  // Visibilidade da coluna
  @Column({ type: 'boolean', default: true })
  isVisible: boolean;

  // Se a coluna é obrigatória
  @Column({ type: 'boolean', default: false })
  isRequired: boolean;

  // Ordem de exibição
  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
