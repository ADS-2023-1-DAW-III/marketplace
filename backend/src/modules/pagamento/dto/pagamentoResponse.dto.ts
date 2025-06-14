import { ApiProperty } from '@nestjs/swagger';
import { Pagamento, PaymentStatus } from '../pagamento.entity';

export class PagamentoResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID único do pagamento.',
    example: '550e8400-e29b-41d4-a716-446655440000',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'ID da cobrança no AbacatePay.',
    example: 'cus_XXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  })
  id_abacate: string;
  @ApiProperty({
    type: 'string',
    format: 'date-time',
    description: 'Data e hora da criação do pagamento.',
    example: '2025-05-29T08:00:00.000Z',
  })
  data: Date;
  @ApiProperty({
    enum: PaymentStatus,
    description: 'Status atual do pagamento (PENDENTE, PAGO, CANCELADO, etc.).',
    example: PaymentStatus.PENDING,
  })
  status: PaymentStatus;
  @ApiProperty({
    type: 'number',
    description: 'Valor do pagamento.',
    example: 99.99,
  })
  valor: number;
  @ApiProperty({
    type: 'string',
    description: 'ID da pessoa contratante.',
    example: 'abc123',
  })
  id_pessoa: string;

  @ApiProperty({
    type: 'string',
    description: 'ID do serviço contratado.',
    example: 'serv123',
  })
  id_servico: string;
  @ApiProperty({
    type: 'string',
    description: 'URL para a tela de pagamento no AbacatePay (se aplicável).',
    example: 'https://abacatepay.com/pagamento/12345',
    nullable: true,
  })
  url?: string;

  constructor(pagamento: Pagamento) {
    this.id = pagamento.id;
    this.id_abacate = pagamento.id_abacate;
    this.valor = parseFloat(pagamento.valor.toString()); // Garante que é um number
    this.data = pagamento.data;
    this.status = pagamento.status;
    this.id_pessoa = pagamento.id_pessoa;
    this.id_servico = pagamento.id_servico;
    this.url = pagamento.paymentUrl;
  }
}

// Para a resposta do histórico e busca por ID
export class PagamentoHistoricoResponseDTO {
  @ApiProperty({
    type: 'string',
    description: 'Mensagem de status.',
    example: 'Histórico de pagamentos retornado com sucesso',
  })
  message: string;

  @ApiProperty({
    type: [PagamentoResponseDto],
    description: 'Lista de pagamentos.',
  })
  pagamentos: PagamentoResponseDto[];
}

export class PagamentoDetalheResponseDTO {
  @ApiProperty({
    type: 'string',
    description: 'Mensagem de status.',
    example: 'Pagamento encontrado',
  })
  message: string;

  @ApiProperty({
    type: PagamentoResponseDto,
    description: 'Detalhes do pagamento.',
  })
  pagamento: PagamentoResponseDto;
}
