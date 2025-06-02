import { CreateNegociacaoResponseDto } from 'src/modules/negociacao/dto/createNegociacaoResponse.dto';
import { Servico } from '../servico.entity';
import { CreateCategoriaResponseDto } from 'src/modules/categoria/dto/createCategoriaResponse.dto';
import { PagamentoResponseDto } from 'src/modules/pagamento/dto/pagamentoResponse.dto';

export class ServicoResponseDto {
    id: string;
    caminhoImagem: string;
    titulo: string;
    eh_negociavel: boolean;
    descricao: string;
    preco: number;
    duracao: number;
    categorias?: CreateCategoriaResponseDto[];
    negociacoes?: CreateNegociacaoResponseDto[];
    pagamentos?: PagamentoResponseDto[];

    constructor(servico: Servico) {
        this.id = servico.id;
        this.caminhoImagem = servico.caminhoImagem;
        this.titulo = servico.titulo;
        this.eh_negociavel = servico.eh_negociavel;
        this.descricao = servico.descricao;
        this.preco = servico.preco;
        this.duracao = servico.duracao;
        this.categorias = servico.categorias?.map(categoria => ({
            nome: categoria.nome,
            descricao: categoria.descricao
        }));
        this.negociacoes = servico.negociacoes?.map(negociacao => ({
            pessoaId: negociacao.pessoa.username,
            servicoId: negociacao.servico.id,
            houve_negociacao: negociacao.houve_negociacao,
            aceito: negociacao.aceito,
            novo_valor: negociacao.novo_valor
        }));
        this.pagamentos = servico.negociacoes?.map(negociacao => ({
            id: negociacao.pagamento?.id,
            id_abacte: negociacao.pagamento?.id_abacte,
            data: negociacao.pagamento?.data,
            status: negociacao.pagamento?.status,
            valor: negociacao.pagamento?.valor
        }));
    }
}