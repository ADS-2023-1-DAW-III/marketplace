import { ApiProperty } from '@nestjs/swagger';
import { Negociacao } from '../negociacao.entity';

export class CreateNegociacaoResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID da Pessoa que realizou o serviço',
  })
  pessoaId: string;
  @ApiProperty({
    type: 'string',
    description: 'ID do serviço',
  })
  servicoId: string;
  @ApiProperty({
    type: 'boolean',
    description: 'Houve negociação no serviço?',
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

  constructor(negociacao: Negociacao) {
    this.pessoaId = negociacao.pessoa?.username;
    this.servicoId = negociacao.servico?.id;
    this.houve_negociacao = negociacao.houve_negociacao;
    this.aceito = negociacao.aceito;
    this.novo_valor = Number(negociacao.novo_valor);
  }
}
