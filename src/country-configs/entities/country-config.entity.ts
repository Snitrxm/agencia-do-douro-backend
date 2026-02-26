import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('country_configs')
export class CountryConfig {
  // ISO 3166-1 alpha-2 code (PT, AE, GB, etc.)
  @PrimaryColumn({ type: 'varchar', length: 2 })
  code: string;

  @Column({ type: 'varchar', length: 100 })
  label: string;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
