export interface NegociacaoResponse {
  id: string;
  pessoaId: string;
  servicoId: string;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
}
