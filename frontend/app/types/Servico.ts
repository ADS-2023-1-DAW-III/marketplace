import type { AvaliacaoResponse } from "./Avaliacao";
import type { Categoria } from "./Categoria";
import type { HistoricoResponse } from "./Historico";
import type { NegociacaoResponse } from "./Negociacao";
import type { Pagamento } from "./Pagamento";
import type { Pessoa } from "./Pessoa";

export type Servico = {
  id: string;
  status: string;
  duracao: string;
  titulo: string;
  descricao: string;
  nome_prestador?: string;
  contato?: string;
  preco: string;
  valorPago?: string;
  data?: Date;
  imagem: string;
  avatar_prestador?: string;
  pessoa?: Pessoa;
};

export interface ServicoDetalhadoInterface {
  id: string;
  caminhoImagem: string;
  titulo: string;
  eh_negociavel: boolean;
  descricao: string;
  preco: string;
  duracao: number;
  status: string;
  pessoa: Pessoa;
  historico: HistoricoResponse[];
  categorias: Categoria[];
  pagamentosRecebidos: Pagamento[];
  negociacoes: NegociacaoResponse[];
  avaliacoes: AvaliacaoResponse[];
}
