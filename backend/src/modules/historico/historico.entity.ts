import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Index,
} from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

@Entity('historico')
export class Historico {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  data: Date;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.historico)
  @JoinColumn({ name: 'id_pessoa', referencedColumnName: 'username' })
  @Index()
  pessoa: Pessoa;

  @ManyToOne(() => Servico, (servico) => servico.historico)
  @JoinColumn({ name: 'id_servico' })
  @Index()
  servico: Servico;
}
