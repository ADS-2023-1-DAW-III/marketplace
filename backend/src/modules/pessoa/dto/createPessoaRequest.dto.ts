import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  Length,
  Matches,
} from 'class-validator'; // Adicione validadores
import { IsCpfFormat } from '../decorators/is-cpf-format.decorator';
// Importe o decorador

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
  nome: string; // Adicionado

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
  contato: string; // Alterei o nome para 'cellphone' no AbacatePayService, mas mantive 'contato' aqui para consistência com sua entidade

  @ApiProperty({
    type: 'string',
    description: 'CPF da pessoa (apenas números ou formatado)',
  })
  @IsString()
  @IsNotEmpty()
  @IsCpfFormat({ message: 'CPF inválido.' }) // Adicionando a validação de formato
  // @Matches(/^\d{11}$/, { message: 'O CPF deve ter 11 dígitos numéricos.' }) // Ou use IsCpfFormat
  cpf: string; // Adicionado
}
