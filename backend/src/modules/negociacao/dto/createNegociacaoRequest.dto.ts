export interface CreateNegociacaoDto {
  id: number;
  houve_negociacao: boolean;
  aceito: boolean;
  novo_valor: number;
  pessoa: string; 
  servico: number; 
}