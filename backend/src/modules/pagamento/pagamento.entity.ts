import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

export enum PaymentStatus {
  PENDING = 'PENDENTE',
  PAID = 'PAGO',
  CANCELLED = 'CANCELADO',
  FAILED = 'FALHOU',
  REFUNDED = 'ESTORNADO',
}

@Entity('pagamento')
export class Pagamento {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string

  @Column({ type: 'varchar', length: 50, nullable: true })
  id_abacate: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @OneToOne(() => Negociacao, (negociacao) => negociacao.pagamento)
  negociacao: Negociacao;


  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @Column({ type: 'enum', enum: PaymentStatus, default: PaymentStatus.PENDING })
  status: PaymentStatus;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.pagamentosRealizados)
  @JoinColumn({ name: 'id_pessoa' })
  pessoa: Pessoa;

  @Column({ name: 'id_pessoa', type: 'varchar' })
  id_pessoa: string;

  @ManyToOne(() => Servico, (servico) => servico.pagamentosRecebidos)
  @JoinColumn({ name: 'id_servico' })
  servico: Servico;

  @Column({ name: 'id_servico', type: 'varchar' }) // Coluna para o ID do serviço contratado
  id_servico: string;

  @Column({ type: 'varchar', length: 255, nullable: true }) // URL de pagamento do AbacatePay
  paymentUrl: string;
}
