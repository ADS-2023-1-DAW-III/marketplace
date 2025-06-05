import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsArray, ArrayNotEmpty } from 'class-validator';

export class CreateServicoRequestDto {
    @IsString()
    @IsNotEmpty()
    id_prestador: string;
    
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

    @IsArray()
    @ArrayNotEmpty()
    @IsString( { each: true })
    categorias: string[];

}