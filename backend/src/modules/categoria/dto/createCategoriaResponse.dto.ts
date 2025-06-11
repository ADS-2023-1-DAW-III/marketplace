import { Categoria } from '../categoria.entity';

export class CreateCategoriaResponseDto {
  nome: string;
  descricao: string;

  constructor(categoria: Categoria) {
    this.nome = categoria.nome;
    this.descricao = categoria.descricao;
  }
}
