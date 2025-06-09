import {
  Entity,
  Column,
  PrimaryColumn,
  ManyToOne,
  CreateDateColumn,
} from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

@Entity('negociacao')
export class Negociacao {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  id: string;

  @Column({ default: false })
  houve_negociacao: boolean;

  @Column({ default: false })
  aceito: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  novo_valor: number;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
  pessoa: Pessoa;

  @ManyToOne(() => Servico, (servico) => servico.id)
  servico: Servico;

  @CreateDateColumn({ type: 'timestamp' })
  data: Date;
}
