import { IsNotEmpty, IsString, IsBoolean, IsNumber } from 'class-validator';

export class CreateServicoRequestDto {
    @IsString()
    @IsNotEmpty()
    titulo: string;
    
    @IsNumber()
    preco: number;
    
    @IsNumber()
    duracao: number;

    @IsString()
    @IsNotEmpty()
    caminhoImagem: string;
    
    @IsBoolean()
    eh_negociavel: boolean;

    @IsString()
    @IsNotEmpty()
    descricao: string;

    @IsString()
    @IsNotEmpty()
    categoria_id: string;

}