import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator';
import { IsCpfFormat } from '../decorators/is-cpf-format.decorator';

export class CreatePessoaRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Nome de usuário (único para login)',
  })
  @IsString()
  @IsNotEmpty()
  username: string;

  // será gerado pelo AbacatePay e atribuído no service.
  // @ApiProperty({
  //   type: 'string',
  //   description: 'ID cliente Abacatepay',
  // })
  // abacate_id: 'null'; // ALTERAR AO CRIAR FLUXO DA CRiAÇÃO DO USER NO ABACATE

  @ApiProperty({
    type: 'string',
    description: 'Nome completo da pessoa',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    type: 'string',
    description: 'Email da pessoa',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    type: 'string',
    description: 'Senha de usuário',
  })
  @IsString()
  @IsNotEmpty()
  @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  senha: string;

  @ApiProperty({
    type: 'string',
    description: 'Contato da pessoa (celular)',
  })
  @IsString()
  @IsNotEmpty()
  @Matches(/^\d{10,11}$/, {
    message: 'O número de telefone deve ter 10 ou 11 dígitos numéricos.',
  })
  contato: string;

  @ApiProperty({
    type: 'string',
    description: 'CPF da pessoa (apenas números ou formatado)',
  })
  @IsString()
  @IsNotEmpty()
  @IsCpfFormat({ message: 'CPF inválido.' })
  cpf: string;
}
