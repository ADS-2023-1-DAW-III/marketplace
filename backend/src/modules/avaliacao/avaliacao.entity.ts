import { Entity, Column, PrimaryColumn, ManyToOne } from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

@Entity('avaliacao')
export class Avaliacao {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  comentario: string;

  @Column({ type: 'integer', nullable: false })
  estrelas: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.avaliacao)
  pessoa: Pessoa;

  @ManyToOne(() => Servico, (servico) => servico.avaliacao)
  servico: Servico;
}