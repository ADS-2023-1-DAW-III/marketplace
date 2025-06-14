import { ApiProperty } from '@nestjs/swagger';

export class CreatePagamentoDto {
  @ApiProperty({
    type: 'string',
    description: 'ID da pessoa contratante.',
    example: 'abc123',
  })
  id_pessoa: string;
  @ApiProperty({
    type: Date,
    description: 'Data que ocorreu o pagamento',
  })
  data: Date;
  @ApiProperty({
    type: 'boolean',
    description: 'Status do pagamento',
  })
  status: boolean;
  @ApiProperty({
    type: 'number',
    description: 'Valor do pagamento',
  })
  valor: number;

  @ApiProperty({
    type: 'string',
    description: 'ID do serviço contratado',
    example: 'servico123',
  })
  id_servico: string; // ID do serviço contratado
  negociacao_id: string;
}
