import { Entity, Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

@Entity('avaliacao')
export class Avaliacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', length: 100, nullable: false })
  comentario: string;

  @Column({ type: 'integer', nullable: false })
  estrelas: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.avaliacoes)
  pessoa: Pessoa;

  @ManyToOne(() => Servico, (servico) => servico.avaliacoes)
  servico: Servico;
}
