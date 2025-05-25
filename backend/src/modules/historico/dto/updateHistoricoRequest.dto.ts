import { IsNotEmpty, IsDateString, IsNumber, IsString } from 'class-validator';

export class UpdateHistoricoRequestDto {
    @IsDateString()
    data: Date;

    @IsNumber()
    id_servico: string;

    @IsString()
    @IsNotEmpty()
    id_pessoa: string;
}