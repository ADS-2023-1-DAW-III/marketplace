import { Injectable, NotFoundException, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servico, ServicoStatus } from './servico.entity';
import { CreateServicoRequestDto } from './dto/createServicoRequest.dto';
import { ServicoResponseDto } from './dto/createServicoResponse.dto';
import { ServicoDetailedResponseDto } from './dto/servicoDetailedResponse.dto';
import { CategoriaService } from '../categoria/categoria.service';
import { PessoaService } from '../pessoa/pessoa.service';
import type { NegociacaoService } from '../negociacao/negociacao.service';
import type { CreateNegociacaoDto } from '../negociacao/dto/createNegociacaoRequest.dto';

@Injectable()
export class ServicoService {
  constructor(
    @Inject('SERVICO_REPOSITORY')
    private readonly servicoRepository: Repository<Servico>,
    private readonly categoriaService: CategoriaService,
    private readonly pessoaService: PessoaService,
  ) { }

  async create(createDto: CreateServicoRequestDto): Promise<ServicoResponseDto> {
    const categorias = await Promise.all(
      createDto.categorias.map(nome => this.categoriaService.findOne(nome)),
    );
    const pessoa = await this.pessoaService.findById(createDto.id_prestador);

    const novo = this.servicoRepository.create({
      ...createDto,
      pessoa,
      categorias,
    });
    const salvo = await this.servicoRepository.save(novo);

    const response = new ServicoResponseDto(salvo);
    return response;
  }

  async findServicesProvidedByUser(username: string): Promise<ServicoDetailedResponseDto> {
    const pessoa = await this.pessoaService.findById(username);
    const servicos = await this.servicoRepository.find({
      where: { pessoa: { username: pessoa.username } },
      relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pessoa', 'negociacoes.pagamento'],
    });
    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviços prestados retornados com sucesso';
    response.servicos = servicos.map(s => new ServicoResponseDto(s));
    return response;
  }

  async save(service: Servico): Promise<boolean> {
    this.servicoRepository.save(service)
    return true;
  }

  async findServicesContractedByUser(username: string): Promise<ServicoDetailedResponseDto> {
    const cliente = await this.pessoaService.findById(username);
    const servicos = await this.servicoRepository
      .createQueryBuilder('servico')
      .leftJoinAndSelect('servico.pessoa', 'prestador')
      .leftJoinAndSelect('servico.categorias', 'categorias')
      .leftJoinAndSelect('servico.negociacoes', 'negociacoes')
      .leftJoinAndSelect('negociacoes.pessoa', 'cliente')
      .leftJoinAndSelect('negociacoes.pagamento', 'pagamento')
      .where('cliente.username = :uname', { uname: cliente.username })
      .getMany();

    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviços contratados retornados com sucesso';
    response.servicos = servicos.map(s => new ServicoResponseDto(s));
    return response;
  }

  async findAll(): Promise<ServicoDetailedResponseDto> {
    const servicos = await this.servicoRepository.find({
      relations: [
        'pessoa',
        'categorias',
        'negociacoes',
        'negociacoes.pessoa',
        'negociacoes.pagamento'
      ]
    });
    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviços retornados com sucesso';
    response.servicos = servicos.map(s => new ServicoResponseDto(s));
    return response;
  }

  async findOne(id: string): Promise<ServicoDetailedResponseDto> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pessoa', 'negociacoes.pagamento'],
    });
    if (!servico) throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviço encontrado';
    response.servicos = [new ServicoResponseDto(servico)];
    return response;
  }

  async findById(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pessoa', 'negociacoes.pagamento'],
    });
    if (!servico) throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    return servico;
  }

  async toEmAndamento(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pessoa', 'negociacoes.pagamento'],
    });
    if (!servico) throw new NotFoundException(`Serviço com ID ${id} não encontrado`);

    if(servico.status !== ServicoStatus.PENDENTE) {
      throw new BadRequestException('O serviço só pode ser movido para EM ANDAMENTO a partir do estado pendente');
    }

    if(servico.pessoa.username !== id) {
      throw new BadRequestException('Só o criador do serviço pode alterar seu status para EM PROGRESSO');
    }

    servico.status = ServicoStatus.EMANDAMENTO;
    await this.servicoRepository.save(servico);

    return servico;
  }

  async toConcluido(id: string): Promise<Servico> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pessoa', 'negociacoes.pagamento'],
    });
    if (!servico) throw new NotFoundException(`Serviço com ID ${id} não encontrado`);

    if(servico.status !== ServicoStatus.EMANDAMENTO) {
      throw new BadRequestException('O serviço só pode ser movido para CONCLUIDO a partir do estado EM ANDAMENTO');
    }
    
    servico.status = ServicoStatus.CONCLUIDO;
    await this.servicoRepository.save(servico);

    return servico;
  }
}
