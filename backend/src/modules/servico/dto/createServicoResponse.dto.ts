import { ApiProperty } from '@nestjs/swagger';
import { Servico } from '../servico.entity';
import { CreateCategoriaResponseDto } from '../../categoria/dto/createCategoriaResponse.dto';
import { CreateNegociacaoResponseDto } from '../../negociacao/dto/createNegociacaoResponse.dto';
import { PagamentoResponseDto } from '../../pagamento/dto/pagamentoResponse.dto';
import { AvaliacaoResponseDTO } from 'src/modules/avaliacao/dto/AvaliacaoResponse.dto';

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
    type: 'number',
    description: 'Preço do serviço',
  })
  preco: number;

  @ApiProperty({
    type: 'number',
    description: 'Duração do serviço',
  })
  duracao: number;

  @ApiProperty({
    type: 'string',
    description: 'ID do prestador (username)',
  })
  id_prestador: string;

  @ApiProperty({
    type: [CreateCategoriaResponseDto],
    description: 'Categorias associadas ao serviço',
  })
  categorias: CreateCategoriaResponseDto[];

  @ApiProperty({
    type: [CreateNegociacaoResponseDto],
    description: 'Negociações relacionadas ao serviço',
  })
  negociacoes: CreateNegociacaoResponseDto[];

  @ApiProperty({
    type: [PagamentoResponseDto],
    description: 'Pagamentos relacionados ao serviço',
  })
  pagamentos: PagamentoResponseDto[];

  @ApiProperty({
    type: [AvaliacaoResponseDTO],
    description: 'Avaliações relacionadas ao serviço',
  })
  avaliacoes: AvaliacaoResponseDTO[];

  constructor(servico: Servico) {
    this.id = servico.id;
    this.caminhoImagem = servico.caminhoImagem;
    this.titulo = servico.titulo;
    this.eh_negociavel = servico.eh_negociavel;
    this.descricao = servico.descricao;
    this.preco = servico.preco;
    this.duracao = servico.duracao;
    this.id_prestador = servico.pessoa.username || '';

    this.categorias = servico.categorias?.map((c) => ({
      nome: c.nome,
      descricao: c.descricao,
    }));

    this.negociacoes = servico.negociacoes?.map(
      (n) => new CreateNegociacaoResponseDto(n),
    );

    this.pagamentos = servico.negociacoes
      ?.filter((n) => n.pagamento)
      ?.map((n) => new PagamentoResponseDto(n.pagamento!));

    this.avaliacoes = servico.avaliacoes?.map(
      (a) => new AvaliacaoResponseDTO(a),
    );
  }
}
