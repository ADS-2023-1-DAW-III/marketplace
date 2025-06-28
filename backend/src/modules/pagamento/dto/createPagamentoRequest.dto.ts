import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString, IsOptional } from 'class-validator';

export class CreatePagamentoDto {
  @ApiProperty({
    type: 'string',
    description: 'ID da pessoa contratante.',
    example: 'abc123',
  })
  @IsString()
  @IsNotEmpty()
  id_pessoa: string;

  @ApiProperty({
    type: 'number',
    description: 'Valor do pagamento',
  })
  @IsNumber()
  valor: number;

  @ApiProperty({
    type: 'string',
    description: 'ID do serviço contratado',
    example: 'servico123',
  })
  @IsString()
  @IsNotEmpty()
  id_servico: string;

  @ApiProperty({
    type: 'string',
    description: 'ID da negociação associada (se houver)',
    required: false,
  })
  @IsOptional()
  @IsString()
  negociacao_id?: string;
}
