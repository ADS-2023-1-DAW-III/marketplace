import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginRequestDTO {
  @ApiProperty({
    type: 'string',
    description: 'Email ou username do usuário',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    type: 'string',
    description: 'senha do usuário',
  })
  @IsString()
  @IsNotEmpty()
  senha: string;
}
