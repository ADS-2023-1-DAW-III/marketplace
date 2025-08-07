import { ApiProperty } from '@nestjs/swagger';

export class UpdateCategoriaRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Descrição da Categoria',
  })
  descricao: string;
}
