import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('site_config')
export class SiteConfig {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'int', unsigned: true, default: 0 })
  clientesSatisfeitos: number;

  @Column({ type: 'float', default: 0 })
  rating: number;

  @Column({ type: 'int', default: 0 })
  anosExperiencia: number;

  @Column({ type: 'int', default: 0 })
  imoveisVendidos: number;

  @Column({ type: 'int', default: 0 })
  episodiosPublicados: number;

  @Column({ type: 'int', default: 0 })
  temporadas: number;

  @Column({ type: 'int', default: 0 })
  especialistasConvidados: number;

  @Column({ type: 'int', default: 0 })
  eurosEmTransacoes: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
