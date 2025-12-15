import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { Property } from '../../properties/entities/property.entity';

@Entity('newsletters')
export class Newsletter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  content: string;

  @Column({ type: 'varchar', length: 100 })
  category: string;

  @Column({ type: 'int', unsigned: true })
  readingTime: number;

  @Column({ type: 'varchar', length: 500, nullable: true })
  coverImage: string;

  @ManyToMany(() => Property)
  @JoinTable({
    name: 'newsletter_properties',
    joinColumn: { name: 'newsletter_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'property_id', referencedColumnName: 'id' },
  })
  properties: Property[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
