import { Pessoa } from '../pessoa.entity';

export class PessoaResponseDTO {
  username: string;
  abacate_id: string;
  nome: string;
  email: string;
  contato: string;

  constructor(pessoa: Pessoa) {
    this.username = pessoa.username;
    this.abacate_id = pessoa.abacate_id;
    this.nome = pessoa.nome;
    this.contato = pessoa.contato;
  }
}
