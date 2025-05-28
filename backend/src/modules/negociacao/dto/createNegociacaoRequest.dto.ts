export interface CreateNegociacaoDto {
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
  pessoa: string; 
  servico: string; 
}