import { Entity, Column, PrimaryColumn, OneToOne, JoinColumn, Generated } from 'typeorm';
import { Negociacao } from '../negociacao/negociacao.entity';

@Entity('pagamento')
export class Pagamento {
  @PrimaryColumn({ type: 'uuid' })
  @Generated('uuid')
  id: string

  @Column()
  id_abacate: string;

  @Column()
  data: Date;

  @Column({ default: false })
  status: boolean;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  valor: number

  @OneToOne(() => Negociacao, (negociacao) => negociacao.pagamento)
  negociacao: Negociacao;

}
