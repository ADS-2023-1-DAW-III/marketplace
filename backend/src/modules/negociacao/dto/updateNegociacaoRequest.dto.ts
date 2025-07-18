import { ApiProperty } from '@nestjs/swagger';

export class updateNegociacaoRequestDto {
  @ApiProperty({
    type: 'boolean',
    description: 'Houve negociação no serviço',
  })
  houve_negociacao: boolean;
  @ApiProperty({
    type: 'boolean',
    description: 'A negociação foi Aceita ?',
  })
  aceito: boolean;
  @ApiProperty({
    type: 'number',
    description: 'Novo valor do serviço',
  })
  novo_valor: number;
  @ApiProperty({
    type: 'string',
    description: 'Pessoa que realizou o serviço',
  })
  pessoa: string;
  @ApiProperty({
    type: 'string',
    description: 'Serviço da negociação',
  })
  servico: string;
}
