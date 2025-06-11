import {
  // IsEmail,
  IsNotEmpty,
  IsString,
  // Length,
  // Matches,
} from 'class-validator';

export class CreatePessoaRequestDTO {
  @IsString()
  @IsNotEmpty()
  username: string; // Será mapeado para 'name' do AbacatePay

  email: string;

  // @Length(6, 20, { message: 'A senha deve ter entre 6 e 20 caracteres.' })
  senha: string;

  // @Matches(/^\d{10,11}$/, {
  //   message: 'O número de telefone deve ter 10 ou 11 dígitos numéricos.',
  // })
  cellphone: string;

  // @Matches(/^\d{11}$|^\d{14}$/, {
  //   message:
  //     'O Tax ID deve ser um CPF (11 dígitos) ou CNPJ (14 dígitos) válido (apenas números).',
  // })
  taxId: string;
}
