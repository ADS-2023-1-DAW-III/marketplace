import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber, IsString } from 'class-validator';

export class CreateHistoricoRequestDto {
  @ApiProperty({
    type: Date,
    description: 'Data da criação do historico'
  })
  @IsDateString()
  data: Date;
  @ApiProperty({
    type: 'string',
    description: 'Id do serviço'
  })
  @IsNumber()
  id_servico: string;
  @ApiProperty({
    type: 'string',
    description: 'ID da pessoa'
  })
  @IsString()
  @IsNotEmpty()
  id_pessoa: string;
}
