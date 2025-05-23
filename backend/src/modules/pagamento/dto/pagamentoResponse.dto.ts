import { Pagamento } from "../pagamento.entity";

export class PagamentoResponseDto {
  id: number;
  id_abacte: string;
  data: Date;
  status: boolean;
  valor: number;

  constructor(entity: Pagamento) {
    this.id = entity.id;
    this.id_abacte = entity.id_abacte;
    this.data = entity.data;
    this.status = entity.status;
    this.valor = entity.valor;
  }
}
