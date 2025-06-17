import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';
import { CreateServicoRequestDto } from './dto/createServicoRequest.dto';
import { ServicoResponseDto } from './dto/createServicoResponse.dto';
import { ServicoDetailedResponseDto } from './dto/servicoDetailedResponse.dto';
import { CategoriaService } from '../categoria/categoria.service';
import { PessoaService } from '../pessoa/pessoa.service';

@Injectable()
export class ServicoService {
  constructor(
    @Inject('SERVICO_REPOSITORY')
    private readonly servicoRepository: Repository<Servico>,
    private readonly categoriaService: CategoriaService,
    private readonly pessoaService: PessoaService,
  ) {}

  async create(
    createDto: CreateServicoRequestDto,
  ): Promise<ServicoDetailedResponseDto> {
    const categorias = await Promise.all(
      createDto.categorias.map((nome) => this.categoriaService.findOne(nome)),
    );
    const pessoa = await this.pessoaService.findById(createDto.id_prestador);

    const novo = this.servicoRepository.create({
      ...createDto,
      pessoa,
      categorias,
    });
    const salvo = await this.servicoRepository.save(novo);

    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviço criado com sucesso';
    response.servicos = [new ServicoResponseDto(salvo)];
    return response;
  }

  async findServicesProvidedByUser(
    username: string,
    query?: string,
    categoria?: string,
    valorMin?: number,
    valorMax?: number,
    avaliacaoMin?: number,
  ): Promise<ServicoDetailedResponseDto> {
    await this.pessoaService.findById(username);

    const qb = this.servicoRepository
      .createQueryBuilder('servico')
      .leftJoinAndSelect('servico.pessoa', 'pessoa')
      .leftJoinAndSelect('servico.categorias', 'categoria')
      .leftJoinAndSelect('servico.negociacoes', 'negociacoes')
      .leftJoinAndSelect('negociacoes.pessoa', 'negociador')
      .leftJoinAndSelect('negociacoes.pagamento', 'pagamento')
      .leftJoinAndSelect('servico.avaliacoes', 'avaliacoes')
      .where('pessoa.username = :username', { username });

    if (query) {
      qb.andWhere('LOWER(servico.titulo) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    if (categoria) {
      qb.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('categoria_servico', 'cs')
            .where('cs.servico_id = servico.id')
            .andWhere('cs.categoria_nome = :categoria')
            .getQuery();
          return `EXISTS ${subQuery}`;
        },
        { categoria: categoria },
      );
    }

    if (valorMin !== undefined) {
      qb.andWhere('servico.preco >= :valorMin', { valorMin });
    }

    if (valorMax !== undefined) {
      qb.andWhere('servico.preco <= :valorMax', { valorMax });
    }

    let servicos = await qb.getMany();

    if (categoria) {
      servicos = servicos.filter((servico) => {
        const nomes_categoria = servico.categorias.map(c => c.nome);
        return nomes_categoria.includes(categoria);
      })
    }

    if (avaliacaoMin !== undefined) {
      servicos = servicos.filter((servico) => {
        const avaliacoes = servico.avaliacoes;
        if (!avaliacoes || avaliacoes.length === 0) return false;
        const media =
          avaliacoes.reduce((sum, a) => sum + a.estrelas, 0) /
          avaliacoes.length;
        return media >= avaliacaoMin;
      });
    }

    const response = new ServicoDetailedResponseDto();
    response.message =
      servicos.length > 0
        ? 'Serviços retornados com sucesso'
        : 'Nenhum serviço encontrado para os filtros informados.';
    response.servicos = servicos.map((s) => new ServicoResponseDto(s));
    return response;
  }

  async findServicesContractedByUser(
    username: string,
    query?: string,
    categoria?: string,
    valorMin?: number,
    valorMax?: number,
    avaliacaoMin?: number,
  ): Promise<ServicoDetailedResponseDto> {
    const cliente = await this.pessoaService.findById(username);
    const qb = this.servicoRepository
      .createQueryBuilder('servico')
      .leftJoinAndSelect('servico.pessoa', 'prestador')
      .leftJoinAndSelect('servico.categorias', 'categorias')
      .leftJoinAndSelect('servico.negociacoes', 'negociacoes')
      .leftJoinAndSelect('negociacoes.pessoa', 'cliente')
      .leftJoinAndSelect('negociacoes.pagamento', 'pagamento')
      .leftJoinAndSelect('servico.avaliacoes', 'avaliacoes') 
      .where('cliente.username = :uname', { uname: cliente.username });

    if (query) {
      qb.andWhere('LOWER(servico.titulo) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    if (categoria) {
      qb.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('categoria_servico', 'cs')
            .where('cs.servico_id = servico.id')
            .andWhere('cs.categoria_nome = :categoria')
            .getQuery();
          return `EXISTS ${subQuery}`;
        },
        { categoria: categoria },
      );
    }

    if (valorMin !== undefined) {
      qb.andWhere('servico.preco >= :valorMin', { valorMin });
    }

    if (valorMax !== undefined) {
      qb.andWhere('servico.preco <= :valorMax', { valorMax });
    }

    let servicos = await qb.getMany();

    if (avaliacaoMin !== undefined) {
      servicos = servicos.filter((servico) => {
        const avaliacoes = servico.avaliacoes;
        if (!avaliacoes || avaliacoes.length === 0) return false;
        const media =
          avaliacoes.reduce((sum, a) => sum + a.estrelas, 0) /
          avaliacoes.length;
        return media >= avaliacaoMin;
      });
    }

    const response = new ServicoDetailedResponseDto();
    response.message =
      servicos.length > 0
        ? 'Serviços retornados com sucesso'
        : 'Nenhum serviço encontrado para os filtros informados.';
    response.servicos = servicos.map((s) => new ServicoResponseDto(s));
    return response;
  }

  async findAll(
    query?: string,
    categoria?: string,
    valorMin?: number,
    valorMax?: number,
    avaliacaoMin?: number,
  ): Promise<ServicoDetailedResponseDto> {
    const qb = this.servicoRepository
      .createQueryBuilder('servico')
      .leftJoinAndSelect('servico.pessoa', 'pessoa')
      .leftJoinAndSelect('servico.categorias', 'categoria')
      .leftJoinAndSelect('servico.negociacoes', 'negociacoes')
      .leftJoinAndSelect('negociacoes.pessoa', 'negociador')
      .leftJoinAndSelect('negociacoes.pagamento', 'pagamento')
      .leftJoinAndSelect('servico.avaliacoes', 'avaliacoes');

    if (query) {
      qb.andWhere('LOWER(servico.titulo) LIKE :query', {
        query: `%${query.toLowerCase()}%`,
      });
    }

    if (categoria) {
      qb.andWhere(
        (qb) => {
          const subQuery = qb
            .subQuery()
            .select('1')
            .from('categoria_servico', 'cs')
            .where('cs.servico_id = servico.id')
            .andWhere('cs.categoria_nome = :categoria')
            .getQuery();
          return `EXISTS ${subQuery}`;
        },
        { categoria: categoria },
      );
    }

    if (valorMin !== undefined) {
      qb.andWhere('servico.preco >= :valorMin', { valorMin });
    }

    if (valorMax !== undefined) {
      qb.andWhere('servico.preco <= :valorMax', { valorMax });
    }

    let servicos = await qb.getMany();

    if (avaliacaoMin !== undefined) {
      servicos = servicos.filter((servico) => {
        const avaliacoes = servico.avaliacoes;
        if (!avaliacoes || avaliacoes.length === 0) return false;
        const media =
          avaliacoes.reduce((sum, a) => sum + a.estrelas, 0) /
          avaliacoes.length;
        return media >= avaliacaoMin;
      });
    }

    const response = new ServicoDetailedResponseDto();
    response.message =
      servicos.length > 0
        ? 'Serviços retornados com sucesso'
        : 'Nenhum serviço encontrado para os filtros informados.';
    response.servicos = servicos.map((s) => new ServicoResponseDto(s));
    return response;
  }

  async findOne(id: string): Promise<ServicoDetailedResponseDto> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: [
        'pessoa',
        'categorias',
        'negociacoes',
        'negociacoes.pessoa',
        'negociacoes.pagamento',
      ],
    });

    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviço encontrado';
    response.servicos = [new ServicoResponseDto(servico)];
    return response;
  }

  async findById(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: [
        'pessoa',
        'categorias',
        'negociacoes',
        'negociacoes.pessoa',
        'negociacoes.pagamento',
      ],
    });

    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    return servico;
  }
}
