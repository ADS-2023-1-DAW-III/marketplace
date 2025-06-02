export interface CreatePagamentoDto {
  id_abacte: string;
  data: Date;
  status: boolean;
  valor: number;
  negociacao_id: string;
}
