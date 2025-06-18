import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateCategoriaDto {
  @ApiProperty({
    type: 'string',
    description: 'Nome da Categoria',
  })
  @IsString()
  @IsNotEmpty()
  nome: string;

  @ApiProperty({
    type: 'string',
    description: 'Descrição da Categoria',
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;
}
