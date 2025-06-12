import { ApiProperty } from "@nestjs/swagger";

export class UpdatePagamentoDto {
  @ApiProperty({
    type: Date,
    description: 'Data da atualização do pagamento',
  })
  data: Date;
  @ApiProperty({
    type: 'boolean',
    description: 'Status da atualização do pagamento',
  })
  status: boolean;
  @ApiProperty({
    type: 'number',
    description: 'Valor do pagamento',
  })
  valor: number;
}
