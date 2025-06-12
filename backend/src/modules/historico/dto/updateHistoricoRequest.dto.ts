import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateHistoricoRequestDto {

  @ApiProperty({
    type: Date,
    description: 'Data do Histórico'
  })
  @IsDateString()
  data: Date;
  @ApiProperty({
    type: 'string',
    description: 'ID de serviço'
  })
  @IsNumber()
  id_servico: string;
  @ApiProperty({
    type: 'string',
    description: 'ID de pessoa'
  })
  @IsString()
  @IsNotEmpty()
  id_pessoa: string;
}
