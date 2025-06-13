import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('avaliacao')
export class Avaliacao {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  comentario: string;

  @Column({ type: 'integer', nullable: false })
  estrelas: number;
}