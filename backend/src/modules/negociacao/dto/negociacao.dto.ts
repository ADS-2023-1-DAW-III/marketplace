import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class NegociacaoDto {
  @IsNotEmpty()
  @IsString()
  id_pessoa: string;

  @IsNotEmpty()
  @IsString()
  id_servico: string;

  @IsNotEmpty()
  @IsNumber()
  novo_valor: number;

  @IsNotEmpty()
  @IsNumber()
  valor: number;

  @IsNotEmpty()
  @IsBoolean()
  houve_negociacao: boolean;

  @IsNotEmpty()
  @IsBoolean()
  aceito: boolean;
}
