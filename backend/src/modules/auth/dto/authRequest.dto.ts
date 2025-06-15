import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Email ou username do usuário',
  })
  @IsString()
  login: string;
  @ApiProperty({
    type: 'string',
    description: 'senha do usuário',
  })
  @IsString()
  senha: string;
}
