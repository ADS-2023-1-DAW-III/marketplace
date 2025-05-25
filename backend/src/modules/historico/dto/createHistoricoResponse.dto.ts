import { Historico } from '../historico.entity';

export class HistoricoResponseDto {
    id: number;
    data: Date;
    id_pessoa: string;
    id_servico: string;

    constructor(historico: Historico) {
        this.id = historico.id;
        this.data = historico.data;
        this.id_pessoa = historico.pessoa?.username ?? null;
        this.id_servico = historico.servico?.id ?? null;
    }
}