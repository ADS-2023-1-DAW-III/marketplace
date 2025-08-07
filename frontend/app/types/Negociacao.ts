export interface NegociacaoCompleta {
  id: string;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
  data: string;
  pessoa: {
    nome: string;
    email: string;
  };
  servico: {
    id: string;
    titulo: string;
    descricao: string;
    duracao: number;
    preco: number;
  };
}

export interface NegociacaoResponse {
  id: string;
  pessoaId: string;
  servicoId: string;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
}