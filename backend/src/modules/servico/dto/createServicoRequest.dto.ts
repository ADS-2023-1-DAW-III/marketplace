import { ApiProperty } from '@nestjs/swagger';

export class CreateServicoRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'Título do serviço',
    nullable: false,
  })
  // @IsNotEmpty()
  titulo: string;
  @ApiProperty({
    type: 'boolean',
    description: 'Indica se o serviço é negociável',
  })
  eh_negociavel: boolean;
  @ApiProperty({
    type: 'string',
    description: 'Descrição do serviço',
    nullable: false,
  }) // @IsNotEmpty()
  descricao: string;
  @ApiProperty({
    type: 'number',
    description: 'Preço do serviço',
  })
  preco: number;
  @ApiProperty({
    type: 'number',
    description: 'Duração do serviço',
  })
  duracao: number;
}
