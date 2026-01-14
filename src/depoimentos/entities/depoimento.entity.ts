import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('depoimentos')
export class Depoimento {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar' })
  clientName: string;

  @Column({ type: 'text' })
  text_pt: string;

  @Column({ type: 'text', nullable: true })
  text_en: string;

  @Column({ type: 'text', nullable: true })
  text_fr: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
