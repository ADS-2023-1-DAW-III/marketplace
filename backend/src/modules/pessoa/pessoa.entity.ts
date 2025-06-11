import { Entity, Column, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Historico } from '../historico/historico.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryGeneratedColumn('uuid') // Ou '@PrimaryGeneratedColumn()' se for numérico
  abacate_id: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  username: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 36 })
  abacatePayCustomerId?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  telefone: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  taxId: string;

  @OneToMany(() => Historico, (historico) => historico.pessoa)
  historico: Historico[];
}
