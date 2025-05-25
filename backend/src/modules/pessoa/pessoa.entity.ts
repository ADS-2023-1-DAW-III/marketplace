import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Historico } from '../historico/historico.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 36 })
  abacate_id: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato: string;

  @OneToMany(() => Historico, (historico) => historico.pessoa)
  historico: Historico[];
}
