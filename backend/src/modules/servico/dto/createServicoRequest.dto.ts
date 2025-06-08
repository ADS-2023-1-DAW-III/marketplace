import { IsNotEmpty, IsString, IsBoolean, IsNumber, IsArray, ArrayNotEmpty, Min } from 'class-validator';

export class CreateServicoRequestDto {
    @IsString()
    @IsNotEmpty()
    id_prestador: string;
    
    @IsString()
    @IsNotEmpty()
    titulo: string;
    
    @IsNumber()
    @Min(0)
    preco: number;
    
    @IsNumber()
    @Min(0)
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