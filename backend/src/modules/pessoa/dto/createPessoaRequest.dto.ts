import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import { IsCpfFormat } from '../decorators/is-cpf-format.decorator';

export class CreatePessoaRequestDTO {
  @IsNotEmpty({ message: 'O nome de usuário não pode estar vazio.' })
  @IsString()
  username: string;
  @IsNotEmpty({ message: 'O nome completo é obrigatório.' })
  @IsString()
  nome: string;

  @IsEmail(
    {},
    {
      message:
        'Por favor, insira um endereço de e-mail válido (ex: seu.email@dominio.com).',
    },
  )
  @IsString()
  email: string;

  @IsCpfFormat()
  @IsString()
  cpf: string;

  @IsNotEmpty({ message: 'A senha não pode estar vazia.' })
  @IsString()
  senha: string;

  @IsPhoneNumber('BR', {
    message:
      'O número de telefone está em um formato inválido para o Brasil. Certifique-se de incluir o DDD e 9 dígitos (ex: (XX) 9XXXX-XXXX ou XX9XXXX-XXXX).',
  })
  @IsString()
  contato?: string;
}
