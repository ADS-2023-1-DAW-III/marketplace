import {
  Injectable,
  Inject,
  NotFoundException,
  BadRequestException,
  InternalServerErrorException,
  UnauthorizedException,
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

@Injectable()
export class NegociacaoService {
  constructor(
    @Inject('NEGOCIACAO_REPOSITORY')
    private negociacaoRepository: Repository<Negociacao>,
    private readonly pessoaService: PessoaService,
    private readonly servicoService: ServicoService,
  ) {}

  async paginate(
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

  async findOne(id: string): Promise<Negociacao> {
    const negociacao = await this.negociacaoRepository.findOne({
      where: { id },
    });
    if (!negociacao) {
      throw new NotFoundException('Negociação não encontrada');
    }
    return negociacao;
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

    const negociacao: Negociacao = this.negociacaoRepository.create({
      ...request,
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
    const negociacao = await this.findOne(id);
    Object.assign(negociacao, updateDto);
    return this.negociacaoRepository.save(negociacao);
  }

  async remove(id: string): Promise<void> {
    const negociacao = await this.findOne(id);
    await this.negociacaoRepository.remove(negociacao);
  }

  async acceptNegotiation(id: string, userId: string): Promise<Negociacao> {
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

    if (negociacao.servico.id !== userId) {
      throw new UnauthorizedException(
        'Você não tem permissão para aceitar esta negociação',
      );
    }

    try {
      negociacao.houve_negociacao = true;
      negociacao.aceito = true;
      return await this.negociacaoRepository.save(negociacao);
    } catch (error) {
      console.error('Erro ao aceitar a negociação:', error);
      throw new InternalServerErrorException('Erro ao aceitar a negociação');
    }
  }
}
