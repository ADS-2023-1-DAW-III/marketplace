import { Servico } from '../servico.entity';
import { CreateCategoriaResponseDto } from '../../categoria/dto/createCategoriaResponse.dto';
import { CreateNegociacaoResponseDto } from '../../negociacao/dto/createNegociacaoResponse.dto';
import { PagamentoResponseDto } from '../../pagamento/dto/pagamentoResponse.dto';

export class ServicoResponseDto {
  id: string;
  caminhoImagem: string;
  titulo: string;
  eh_negociavel: boolean;
  descricao: string;
  preco: number;
  duracao: number;
  id_prestador: string;
  categorias: CreateCategoriaResponseDto[];
  negociacoes: CreateNegociacaoResponseDto[];
  pagamentos: PagamentoResponseDto[];

  constructor(servico: Servico) {
    this.id = servico.id;
    this.caminhoImagem = servico.caminhoImagem;
    this.titulo = servico.titulo;
    this.eh_negociavel = servico.eh_negociavel;
    this.descricao = servico.descricao;
    this.preco = servico.preco;
    this.duracao = servico.duracao;
    this.id_prestador = servico.pessoa.username || '';
    this.categorias = servico.categorias?.map(c => ({ nome: c.nome, descricao: c.descricao }));
    this.negociacoes = servico.negociacoes?.map(n => new CreateNegociacaoResponseDto(n));
    this.pagamentos = servico.negociacoes
      ?.filter(n => n.pagamento)
      ?.map(n => new PagamentoResponseDto(n.pagamento!));
  }
}