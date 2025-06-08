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

  async create(createDto: CreateServicoRequestDto): Promise<ServicoDetailedResponseDto> {
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

    const response = new ServicoDetailedResponseDto();
    response.message = 'Serviço criado com sucesso';
    response.servicos = [new ServicoResponseDto(salvo)];
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
    const servicos = await this.servicoRepository.find({ relations: ['categorias'] });
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
}
