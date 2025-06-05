import { Injectable, Inject, NotFoundException, InternalServerErrorException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';
import { CreateServicoRequestDto } from './dto/createServicoRequest.dto';
import { UpdateServicoRequestDto } from './dto/updateServicoRequest.dto';
import { ServicoResponseDto } from './dto/createServicoResponse.dto';
import { ServicoDetailedResponseDto } from './dto/servicoDetailedResponse.dto';
import { CategoriaService } from '../categoria/categoria.service';
import { PessoaService } from '../pessoa/pessoa.service';

@Injectable()
export class ServicoService {
    constructor(
        @Inject('SERVICO_REPOSITORY')
        private servicoRepository: Repository<Servico>,
        private readonly categoriaService: CategoriaService,
        private readonly pessoaService: PessoaService,
    ) {}

    async create(createDto: CreateServicoRequestDto): Promise<ServicoDetailedResponseDto> {
        const categorias = await Promise.all(
            createDto.categorias.map(nome =>
                this.categoriaService.findOne(nome) 
            )
        );

        const pessoa = await this.pessoaService.findById(createDto.id_prestador);

        const novoServico: Servico = this.servicoRepository.create({
            ...createDto,
            pessoa,
            categorias
        });

        const servicoSalvo: Servico = await this.servicoRepository.save(novoServico);

        const response: ServicoDetailedResponseDto = new ServicoDetailedResponseDto();
        response.message = "Serviço criado com sucesso";
        response.servicos = [new ServicoResponseDto(servicoSalvo)];
        response.servicos[0].id_prestador = pessoa.username;
        return response;
    }

    async findServicesProvidedByUser(userId: string): Promise<ServicoDetailedResponseDto> {
        const pessoa = await this.pessoaService.findById(userId);

        const servicosPorUsuario: Servico[] = await this.servicoRepository.find({
            where: { pessoa: { username: pessoa.username } },
            relations: ['pessoa', 'categorias', 'negociacoes', 'negociacoes.pagamento']
        });

        const response: ServicoDetailedResponseDto = new ServicoDetailedResponseDto();
        response.message = "Serviços prestados retornados com sucesso";
        response.servicos = servicosPorUsuario.map(servico => new ServicoResponseDto(servico));
        return response;
    }

    async findAll(): Promise<ServicoResponseDto[]> {
        const servicos = await this.servicoRepository.find();
        return servicos.map(servico => new ServicoResponseDto(servico));
    }

    async findOne(id: string): Promise<ServicoResponseDto> {
        const servico = await this.servicoRepository.findOne({ 
            where: { id },
            relations: ['pessoa']
        });
        
        if (!servico) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }
        
        return new ServicoResponseDto(servico);
    }

    async update(id: string, updateDto: UpdateServicoRequestDto): Promise<ServicoResponseDto> {
        const exists = await this.servicoRepository.exist({ where: { id } });
        if (!exists) {
            throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
        }

        await this.servicoRepository.update(id, updateDto);
        const updated = await this.servicoRepository.findOne({ 
            where: { id },
            relations: ['pessoa'] 
        });
        
        return new ServicoResponseDto(updated!);
    }

    async remove(id: string): Promise<void> {
        await this.servicoRepository.delete(id);
    }

    async findById(id: string): Promise<Servico | null> {
        return this.servicoRepository.findOne({ where: { id } });
    }
}