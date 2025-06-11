import { Pessoa } from '../pessoa.entity';

export class CreatePessoaResponseDTO {
  userId: string;
  username: string;
  abacatePayCustomerId?: string;
  nome: string;
  email: string;
  contato: string;

  constructor(pessoa: Pessoa) {
    this.username = pessoa.username;
    this.userId = pessoa.abacate_id;
    this.abacatePayCustomerId = pessoa.abacatePayCustomerId;
    this.nome = pessoa.nome;
    this.email = pessoa.email;
    this.contato = pessoa.telefone;
  }
}
