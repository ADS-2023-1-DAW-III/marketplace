import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Historico } from '../historico/historico.entity';
import { Pagamento } from '../pagamento/pagamento.entity';
import { Avaliacao } from '../avaliacao/avaliacao.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  abacate_id: string;

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  cpf: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato: string;

  @Column({ nullable: true })
  profileImageName: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  habilidades: string;

  @OneToMany(() => Historico, (historico) => historico.pessoa)
  historico: Historico[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.pessoa)
  pagamentosRealizados: Pagamento[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.pessoa)
  avaliacoes: Avaliacao[];
}
