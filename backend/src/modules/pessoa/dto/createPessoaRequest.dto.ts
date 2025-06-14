import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsOptional } from 'class-validator';

export class CreatePessoaRequestDTO {
  @ApiProperty({ type: 'string', description: 'Nome de usuário' })
  @IsString()
  username: string;

  @ApiProperty({ type: 'string', description: 'ID cliente Abacatepay', required: false })
  @IsOptional()
  @IsString()
  abacate_id?: string;

  @ApiProperty({ type: 'string', description: 'Nome da pessoa' })
  @IsString()
  nome: string;

  @ApiProperty({ type: 'string', description: 'Nome da pessoa' })
  @IsString()
  cpf: string;

  @ApiProperty({ type: 'string', description: 'Email da pessoa' })
  @IsString()
  email: string;

  @ApiProperty({ type: 'string', description: 'Senha de usuário' })
  @IsString()
  senha: string;

  @ApiProperty({ type: 'string', description: 'Contato da pessoa' })
  @IsString()
  contato: string;
}
