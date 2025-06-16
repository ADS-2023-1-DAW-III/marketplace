import { ApiProperty } from '@nestjs/swagger';
import { Servico } from '../servico.entity';

export class ServicoResponseDto {
  @ApiProperty({
    type: 'string',
    description: 'ID do serviço',
  })
  id: string;
  @ApiProperty({
    type: 'string',
    description: 'Caminho da imagem do serviço',
    nullable: false,
  })
  caminhoImagem: string;
  @ApiProperty({
    type: 'string',
    description: 'Título do serviço',
    nullable: false,
  })
  titulo: string;
  @ApiProperty({
    type: 'boolean',
    description: 'Indica se o serviço é negociável',
  })
  eh_negociavel: boolean;
  @ApiProperty({
    type: 'string',
    description: 'Descrição do serviço',
    nullable: false,
  })
  descricao: string;
  @ApiProperty({
    type: 'string',
    description: 'Preço do serviço',
  })
  preco: number;
  @ApiProperty({
    type: 'string',
    description: 'Duração do serviço',
  })
  duracao: number;

  constructor(servico: Servico) {
    this.id = servico.id;
    this.titulo = servico.titulo;
    this.eh_negociavel = servico.eh_negociavel;
    this.descricao = servico.descricao;
    this.preco = servico.preco;
    this.duracao = servico.duracao;
    this.caminhoImagem = this.generateUrlImage(this.id, servico.caminhoImagem);
  }

  private generateUrlImage(servico: string, filename: string): string {
    if (filename == null) {
      return '';
    }
    return `/uploads/${servico}/${filename}`;
  }
}
