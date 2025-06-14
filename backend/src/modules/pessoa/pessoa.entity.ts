import { Entity, Column, PrimaryColumn, OneToMany } from 'typeorm';
import { Historico } from '../historico/historico.entity';
import { Pagamento } from '../pagamento/pagamento.entity';

@Entity('pessoa')
export class Pessoa {
  @PrimaryColumn({ type: 'varchar', length: 50 })
  username: string;

  @Column({ type: 'varchar', length: 36, nullable: true })
  abacate_id: string; // Sem valor padrão, será preenchido após a API do AbacatePay

  @Column({ type: 'varchar', length: 100 })
  nome: string;

  @Column({ type: 'varchar', length: 100, unique: true })
  email: string;

  @Column({ type: 'varchar', length: 100, unique: true }) // CPF parece ser um campo único e obrigatório
  cpf: string;

  @Column({ type: 'varchar', length: 255 })
  senha: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  contato: string;

  @OneToMany(() => Historico, (historico) => historico.pessoa)
  historico: Historico[];

  @OneToMany(() => Pagamento, (pagamento) => pagamento.pessoa) // <-- ADICIONADO: Relação com Pagamento
  pagamentosRealizados: Pagamento[]; // <-- ADICIONADO
}
