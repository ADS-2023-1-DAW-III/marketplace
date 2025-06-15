import { ServicoResponseDto } from "./createServicoResponse.dto";

export class ServicoDetailedResponseDto {
    message: string;
    servicos: ServicoResponseDto[];
    
}