import { Negociacao } from '../negociacao.entity';

export class CreateNegociacaoResponseDto {
  id: number;
  pessoaId: string;
  servicoId: number;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;

  constructor(negociacao: Negociacao) {
    this.id = negociacao.id;
    this.pessoaId = negociacao.pessoa?.username;
    this.servicoId = negociacao.servico?.id;
    this.houve_negociacao = negociacao.houve_negociacao;
    this.aceito = negociacao.aceito;
    this.novo_valor = Number(negociacao.novo_valor);
  }
}
