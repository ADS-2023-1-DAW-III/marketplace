import { ApiProperty } from '@nestjs/swagger';

export class AuthResponseDTO {
  @ApiProperty({
    type: 'string',
    description: 'token de acesso do usuário',
  })
  token: string;
  @ApiProperty({
    type: 'string',
    description: 'Id do usuário',
  })
  userId: string;
}
