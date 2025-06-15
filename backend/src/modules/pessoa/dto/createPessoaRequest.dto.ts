import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsCpfFormat } from '../decorators/is-cpf-format.decorator';

export class CreatePessoaRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Nome de usuário',
  })
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @IsString()
  username: string;
  @ApiProperty({
    type: 'string',
    description: 'ID cliente Abacatepay',
  })
  abacate_id: 'null'; // ALTERAR AO CRIAR FLUXO DA CRiAÇÃO DO USER NO ABACATE
  @ApiProperty({
    type: 'string',
    description: 'Nome da pessoa',
  })
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  @IsString()
  nome: string;
  @ApiProperty({
    type: 'string',
    description: 'Email da pessoa',
  })
  @IsEmail(
    {},
    {
      message:
        'Por favor, insira um endereço de e-mail válido (ex: seu.email@dominio.com).',
    },
  )
  @IsString()
  email: string;
  @ApiProperty({
    type: 'string',
    description: 'Senha de usuário',
  })
  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsString()
  senha: string;
  @ApiProperty({
    type: 'string',
    description: 'Contato da pessoa',
  })
  @IsPhoneNumber('BR', {
    message:
      'O número de telefone está em um formato inválido para o Brasil. Certifique-se de incluir o DDD e 9 dígitos (ex: (XX) 9XXXX-XXXX ou XX9XXXX-XXXX).',
  })
  @IsString()
  contato: string;
  @IsCpfFormat()
  @IsString()
  cpf: string;
}
