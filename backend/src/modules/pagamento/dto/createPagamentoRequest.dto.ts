import { ApiProperty } from '@nestjs/swagger';

export class CreatePagamentoDto {
  @ApiProperty({
    type: 'string',
    description: 'Id do pagamento',
  })
  id_abacte: string;
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
}
