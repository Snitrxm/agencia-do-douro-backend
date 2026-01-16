import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('desired_zones')
export class DesiredZone {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', nullable: false })
  image: string;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ type: 'boolean', default: true })
  isActive: boolean;

  // Country code - ISO 3166-1 alpha-2 (PT, AE, GB, etc.)
  @Column({ type: 'varchar', length: 2, default: 'PT' })
  country: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
