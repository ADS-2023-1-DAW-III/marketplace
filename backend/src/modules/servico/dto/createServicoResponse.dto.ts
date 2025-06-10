import { Servico } from '../servico.entity';

export class ServicoResponseDto {
  id: string;
  caminhoImagem: string;
  titulo: string;
  eh_negociavel: boolean;
  descricao: string;
  preco: number;
  duracao: number;

  constructor(servico: Servico) {
    this.id = servico.id;
    this.caminhoImagem = servico.caminhoImagem;
    this.titulo = servico.titulo;
    this.eh_negociavel = servico.eh_negociavel;
    this.descricao = servico.descricao;
    this.preco = servico.preco;
    this.duracao = servico.duracao;
  }
}
