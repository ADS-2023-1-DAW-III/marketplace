import { ApiProperty } from '@nestjs/swagger';
import { Historico } from '../historico.entity';

export class HistoricoResponseDto {
  @ApiProperty({
    type: 'number',
    description: 'ID do histórico'
  })
  id: number;
  @ApiProperty({
    type: Date,
    description: 'Data do histórico'
  })
  data: Date;
  @ApiProperty({
    type: 'string',
    description: 'ID de pessoa'
  })
  id_pessoa: string;
  @ApiProperty({
    type: 'string',
    description: 'ID de serviço'
  })
  id_servico: string;

  constructor(historico: Historico) {
    this.id = historico.id;
    this.data = historico.data;
    this.id_pessoa = historico.pessoa?.username ?? null;
    this.id_servico = historico.servico?.id ?? null;
  }
}
