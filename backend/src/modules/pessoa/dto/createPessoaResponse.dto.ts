import { ApiProperty } from '@nestjs/swagger';
import { Pessoa } from '../pessoa.entity';

export class CreatePessoaResponseDTO {
  @ApiProperty({
    type: 'string',
    description: 'Nome de usuário',
  })
  username: string;
  @ApiProperty({
    type: 'string',
    description: 'ID cliente Abacatepay',
  })
  abacate_id: string;
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
    description: 'Contato da pessoa',
  })
  contato: string;

  constructor(pessoa: Pessoa) {
    this.username = pessoa.username;
    this.abacate_id = pessoa.abacate_id;
    this.nome = pessoa.nome;
    this.contato = pessoa.contato;
  }
}
