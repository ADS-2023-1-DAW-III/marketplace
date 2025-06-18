import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
} from '@nestjs/common';
import { FindManyOptions, Repository } from 'typeorm';
import { Negociacao } from './negociacao.entity';
import { CreateNegociacaoDto } from './dto/createNegociacaoRequest.dto';
import { CreateNegociacaoResponseDto } from './dto/createNegociacaoResponse.dto';
import { updateNegociacaoRequestDto } from './dto/updateNegociacaoRequest.dto';

import { PessoaService } from '../pessoa/pessoa.service';
import { ServicoService } from '../servico/servico.service';
import { GetNegociacaoQueryDto } from './dto/getNegociacaoQuery.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { NegociacaoDto } from './dto/negociacao.dto';
import { HistoricoService } from '../historico/historico.service';
import type { CreateHistoricoRequestDto } from '../historico/dto/createHistoricoRequest.dto';
import { ServicoStatus } from '../servico/servico.entity';
import { CreateServicoRequestDto } from '../servico/dto/createServicoRequest.dto';

@Injectable()
export class NegociacaoService {
  constructor(
    @Inject('NEGOCIACAO_REPOSITORY')
    private negociacaoRepository: Repository<Negociacao>,
    private readonly pessoaService: PessoaService,
    private readonly servicoService: ServicoService,
    private readonly historicoService: HistoricoService,
  ) {}

  private async paginate(
    pagination: PaginationQueryDto,
    options?: FindManyOptions<Negociacao>,
  ) {
    const { page = 1, limit = 10 } = pagination;
    const skip = (page - 1) * limit;

    const [negociacoes, total] = await this.negociacaoRepository.findAndCount({
      ...options,
      skip,
      take: limit,
    });

    return {
      total,
      limit,
      page,
      negociacoes,
    };
  }

  async findAll(): Promise<Negociacao[]> {
    return this.negociacaoRepository.find();
  }

  async findAllByContractor(
    idContractor: string,
    query: GetNegociacaoQueryDto,
  ) {
    return this.paginate(query, {
      where: {
        pessoa: {
          username: idContractor,
        },
      },
      order: query.recentes ? { data: 'DESC' } : undefined,
    });
  }

  async findAllByProvider(idProvider: string, query: GetNegociacaoQueryDto) {
    return this.paginate(query, {
      where: {
        servico: {
          pessoa: {
            username: idProvider,
          },
        },
      },
      order: query.recentes ? { data: 'DESC' } : undefined,
    });
  }

  async findById(id: string): Promise<Negociacao> {
    const negociacao = await this.negociacaoRepository.findOne({
      where: { id },
      relations: ['pessoa', 'servico', 'pagamento'],
    });
    if (!negociacao)
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    return negociacao;
  }

  async verifyStatus(
    pessoaId: string,
    negociacaoId: string,
  ): Promise<NegociacaoDto> {
    const negociacao = await this.negociacaoRepository
      .createQueryBuilder('negociacao')
      .leftJoinAndSelect('negociacao.pessoa', 'pessoa')
      .leftJoinAndSelect('negociacao.servico', 'servico')
      .leftJoinAndSelect('servico.pessoa', 'servicoPessoa')
      .where('negociacao.id = :negociacaoId', { negociacaoId })
      .andWhere(
        '(pessoa.username = :pessoaId OR servicoPessoa.username = :pessoaId)',
        { pessoaId },
      )
      .getOne();

    if (!negociacao) {
      throw new NotFoundException('Negociação não encontrada');
    }

    const negociacaoDto: NegociacaoDto = {
      id_pessoa: negociacao.pessoa.username,
      id_servico: negociacao.servico.id,
      novo_valor: negociacao.novo_valor,
      valor: negociacao.servico.preco,
      houve_negociacao: negociacao.houve_negociacao,
      aceito: negociacao.aceito,
    };

    return negociacaoDto;
  }

  async create(
    request: CreateNegociacaoDto,
  ): Promise<CreateNegociacaoResponseDto> {
    const pessoa = await this.pessoaService.findById(request.pessoa);
    const servico = await this.servicoService.findById(request.servico);

    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada');
    }
    if (!servico) {
      throw new NotFoundException('Serviço não encontrado');
    }

    const historico: CreateHistoricoRequestDto = {
      data: new Date(),
      id_servico: servico.id,
      id_pessoa: pessoa.username,
    };

    await this.historicoService.create(historico);

    const negociacao: Negociacao = this.negociacaoRepository.create({
      ...request,
      houve_negociacao: false,
      aceito: false,
      pessoa,
      servico,
    });
    const saved = await this.negociacaoRepository.save(negociacao);
    return new CreateNegociacaoResponseDto(saved);
  }

  async update(
    id: string,
    updateDto: updateNegociacaoRequestDto,
  ): Promise<Negociacao> {
    const negociacao = await this.negociacaoRepository.findOneBy({ id });

    if (!negociacao) {
      throw new NotFoundException('Negociação não encontrada');
    }

    Object.assign(negociacao, updateDto);
    return this.negociacaoRepository.save(negociacao);
  }

  async remove(id: string): Promise<void> {
    const result = await this.negociacaoRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException('Negociação não encontrada');
    }
  }

  async aceitarNegociacao(id: string, userId: string): Promise<Negociacao> {
    const negociacao = await this.negociacaoRepository.findOne({
      where: { id },
      relations: ['servico', 'pessoa'],
    });

    if (!negociacao) {
      throw new NotFoundException('Negociação não encontrada');
    }

    if (!negociacao.servico || !negociacao.servico.id) {
      throw new BadRequestException('Serviço inválido ou sem criador');
    }

    try {
      if (negociacao.novo_valor > 0) {
        negociacao.houve_negociacao = true;
      }

      negociacao.aceito = true;
      return await this.negociacaoRepository.save(negociacao);
    } catch (error) {
      console.error('Erro ao aceitar a negociação:', error);
      throw new InternalServerErrorException('Erro ao aceitar a negociação');
    }
  }

  async negarNegociacao(id: string, userId: string): Promise<Negociacao> {
    const negociacao = await this.negociacaoRepository.findOne({
      where: { id },
      relations: ['servico'],
    });

    if (!negociacao) {
      throw new NotFoundException('Negociação não encontrada');
    }

    if (!negociacao.servico || !negociacao.servico.id) {
      throw new BadRequestException('Serviço inválido ou sem criador');
    }

    try {
      negociacao.aceito = false;
      negociacao.servico.status = ServicoStatus.NEGADO;
      await this.servicoService.create(new CreateServicoRequestDto());
      return await this.negociacaoRepository.save(negociacao);
    } catch (error) {
      console.error('Erro ao aceitar a negociação:', error);
      throw new InternalServerErrorException('Erro ao aceitar a negociação');
    }
  }
}
