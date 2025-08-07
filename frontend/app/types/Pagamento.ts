import type { Servico } from "./Servico";

export enum PaymentStatus {
  PENDING = "PENDENTE",
  PAID = "PAGO",
  CANCELLED = "CANCELADO",
  FAILED = "FALHOU",
  REFUNDED = "ESTORNADO",
}

export interface Pagamento {
  id: string;
  id_abacate?: string;
  valor: number;
  id_negociacao: string;
  data: Date;
  status: PaymentStatus;
  id_pessoa: string;
  id_servico: string;
  paymentUrl?: string;
}

export interface PagamentoInterface {
  id: string;
  data: Date;
  valor: number;
  servico: Servico;
  status: string;
  url_abacate?: string;
}
