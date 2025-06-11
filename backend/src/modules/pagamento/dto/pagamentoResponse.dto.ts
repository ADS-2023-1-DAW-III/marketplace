import { ApiProperty } from '@nestjs/swagger';
import { Pagamento } from '../pagamento.entity';

export class PagamentoResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'Id do pagamento no banco de dados',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Id do pagamento no abacatePay',
  })
  id_abacate: string;
  @ApiProperty({
    type: Date,
    description: 'Data do pagamento',
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

  constructor(entity: Pagamento) {
    this.id = entity.id;
    this.id_abacate = entity.id_abacate;
    this.data = entity.data;
    this.status = entity.status;
    this.valor = entity.valor;
  }
}
