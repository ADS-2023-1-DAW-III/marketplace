import { Avaliacao } from '../avaliacao.entity';

export class AvaliacaoResponseDTO {
  id: string;
  comentario: string;
  estrelas: number;

  constructor(entity: Avaliacao) {
    this.id = entity.id;
    this.comentario = entity.comentario;
    this.estrelas = entity.estrelas;
  }
}
