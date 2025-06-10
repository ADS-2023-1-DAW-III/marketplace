import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateServicoRequestDto {
  @IsString()
  @IsNotEmpty()
  caminhoImagem: string;

  @IsString()
  @IsNotEmpty()
  titulo: string;

  @IsBoolean()
  eh_negociavel: boolean;

  @IsString()
  @IsNotEmpty()
  descricao: string;

  @IsNumber()
  preco: number;

  @IsNumber()
  duracao: number;
}
