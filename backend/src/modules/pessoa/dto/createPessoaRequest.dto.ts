import { ApiProperty } from '@nestjs/swagger';

export class CreatePessoaRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Nome de usuário',
  })
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
  nome: string;
  @ApiProperty({
    type: 'string',
    description: 'Email da pessoa',
  })
  email: string;
  @ApiProperty({
    type: 'string',
    description: 'Cpf do usuário'
  })
  cpf: string;
  @ApiProperty({
    type: 'string',
    description: 'Senha de usuário',
  })
  senha: string;
  @ApiProperty({
    type: 'string',
    description: 'Contato da pessoa',
  })
  contato: string;
}
