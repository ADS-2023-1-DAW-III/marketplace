import { ApiProperty } from '@nestjs/swagger';

export class LoginRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Email ou username do usuário',
  })
  login: string;
  @ApiProperty({
    type: 'string',
    description: 'senha do usuário',
  })
  senha: string;
}
