import { ApiProperty } from '@nestjs/swagger';
import { Categoria } from '../categoria.entity';

export class CreateCategoriaResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome da Categoria',
  })
  nome: string;

  @ApiProperty({
    type: 'string',
    description: 'Descrição da Categoria',
  })
  descricao: string;

  constructor(categoria: Categoria) {
    this.nome = categoria.nome;
    this.descricao = categoria.descricao;
  }
}
