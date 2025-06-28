import {
  Entity,
  Column,
  ManyToOne,
  JoinColumn,
  OneToOne,
  CreateDateColumn,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';
import { Pagamento } from '../pagamento/pagamento.entity';

@Entity('negociacao')
export class Negociacao {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ default: false })
  houve_negociacao: boolean;

  @Column({ default: false })
  aceito: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  novo_valor: number;

  @CreateDateColumn({ type: 'timestamp' })
  data: Date;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
  pessoa: Pessoa;

  @ManyToOne(() => Servico, (servico) => servico.id)
  servico: Servico;

  @OneToOne(() => Pagamento, (pagamento) => pagamento.negociacao)
  @JoinColumn({ name: 'pagamento_id' })
  pagamento: Pagamento;
}
