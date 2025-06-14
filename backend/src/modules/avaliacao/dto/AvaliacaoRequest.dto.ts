import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class AvaliacaoRequestDTO {
  @IsString()
  @IsNotEmpty()
  comentario: string;

  @IsNumber()
  @IsNotEmpty()
  estrelas: number;
}