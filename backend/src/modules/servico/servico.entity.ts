import {
  Entity,
  Column,
  ManyToOne,
  OneToMany,
  ManyToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Historico } from '../historico/historico.entity';
import { Categoria } from '../categoria/categoria.entity';
import { Pagamento } from '../pagamento/pagamento.entity';
import { Negociacao } from '../negociacao/negociacao.entity';
import { Avaliacao } from '../avaliacao/avaliacao.entity';

export enum ServicoStatus {
  PENDENTE = 'PENDENTE',
  EMANDAMENTO = 'EM ANDAMENTO',
  CONCLUIDO = 'CONCLUIDO',
  NEGADO = 'NEGADO'
}

@Entity('servico')
export class Servico {
  @PrimaryGeneratedColumn("uuid")
  id: string

  @Column({ nullable: false })
  caminhoImagem: string;

  @Column({ type: 'varchar', length: 100 })
  titulo: string;

  @Column({ default: false })
  eh_negociavel: boolean;

  @Column({ type: 'varchar', length: 255 })
  descricao: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  preco: number;

  @Column({ type: 'int' })
  duracao: number;

  @Column({ type: 'enum', enum: ServicoStatus, default: ServicoStatus.PENDENTE })
  status: ServicoStatus;

  @ManyToOne(() => Pessoa, (pessoa) => pessoa.username)
  pessoa: Pessoa;

  @OneToMany(() => Historico, (historico) => historico.pessoa)
  historico: Historico[];

  @ManyToMany(() => Categoria, (categoria) => categoria.servicos)
  categorias: Categoria[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.servico) // <-- ADICIONADO: Relação com Pagamento
  pagamentosRecebidos: Pagamento[]; // <-- ADICIONADO

  @OneToMany(() => Negociacao, (negociacao) => negociacao.servico)
  negociacoes: Negociacao[];

  @OneToMany(() => Avaliacao, (avaliacao) => avaliacao.servico)
  avaliacoes: Avaliacao[];
}
