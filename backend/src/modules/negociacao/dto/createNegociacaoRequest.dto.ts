import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateNegociacaoDto {
  @ApiProperty({
    type: 'boolean',
    description: 'Houve negociação no serviço',
  })
  @IsBoolean()
  houve_negociacao: boolean;

  @ApiProperty({
    type: 'boolean',
    description: 'A negociação foi Aceita?',
  })
  @IsBoolean()
  aceito: boolean;

  @ApiProperty({
    type: 'number',
    description: 'Novo valor do serviço',
  })
  @IsNumber()
  @Min(0)
  novo_valor: number;

  @ApiProperty({
    type: 'string',
    description: 'Pessoa que realizou o serviço',
  })
  @IsString()
  @IsNotEmpty()
  pessoa: string;

  @ApiProperty({
    type: 'string',
    description: 'Serviço da negociação',
  })
  @IsString()
  @IsNotEmpty()
  servico: string;
}
