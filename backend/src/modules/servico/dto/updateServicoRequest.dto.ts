import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsOptional } from 'class-validator';

export class UpdateServicoRequestDto {
    @IsString()
    @IsOptional()
    caminhoImagem?: string;

    @IsString()
    @IsOptional()
    titulo?: string;

    @IsBoolean()
    @IsOptional()
    eh_negociavel?: boolean;

    @IsString()
    @IsOptional()
    descricao?: string;

    @IsNumber()
    @IsOptional()
    preco?: number;

    @IsNumber()
    @IsOptional()
    duracao?: number;
}