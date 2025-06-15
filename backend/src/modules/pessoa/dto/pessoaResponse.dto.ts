import { ApiProperty } from '@nestjs/swagger';
import { Pessoa } from '../pessoa.entity';

export class PessoaResponseDTO {
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
  @ApiProperty({
    type: 'string',
    description: 'Url de acessoa imagem de perfil da pessoa',
  })
  profileImageUrl?: string;

  constructor(pessoa: Pessoa) {
    this.username = pessoa.username;
    this.abacate_id = pessoa.abacate_id;
    this.nome = pessoa.nome;
    this.contato = pessoa.contato;
    this.email = pessoa.email;
    this.profileImageUrl = this.generateUrlImage(
      this.username,
      pessoa.profileImageName,
    );
  }

  private generateUrlImage(username: string, filename: string): string {
    if (filename == null) {
      return '';
    }
    return `/uploads/${username}/${filename}`;
  }
}
