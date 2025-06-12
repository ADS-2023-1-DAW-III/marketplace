import { ApiProperty } from '@nestjs/swagger';

export class CreateCategoriaDto {
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
}
