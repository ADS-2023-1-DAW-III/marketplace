import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsBoolean,
  IsNumber,
  IsArray,
  ArrayNotEmpty,
  Min,
} from 'class-validator';

export class CreateServicoRequestDto {
  @ApiProperty({
    type: 'string',
    description: 'ID do prestador que está criando o serviço',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  id_prestador: string;

  @ApiProperty({
    type: 'string',
    description: 'Título do serviço',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  titulo: string;

  @ApiProperty({
    type: 'number',
    description: 'Preço do serviço',
  })
  @IsNumber()
  @Min(0)
  preco: number;

  @ApiProperty({
    type: 'number',
    description: 'Duração do serviço',
  })
  @IsNumber()
  @Min(0)
  duracao: number;

  @ApiProperty({
    type: 'boolean',
    description: 'Indica se o serviço é negociável',
  })
  @IsBoolean()
  eh_negociavel: boolean;

  @ApiProperty({
    type: 'string',
    description: 'Descrição do serviço',
    nullable: false,
  })
  @IsString()
  @IsNotEmpty()
  descricao: string;

  @ApiProperty({
    type: 'array',
    description: 'Categorias associadas ao serviço',
    nullable: false,
    isArray: true,
    items: { type: 'string' },
  })
  @IsArray()
  @ArrayNotEmpty()
  @IsString({ each: true })
  categorias: string[];
}
