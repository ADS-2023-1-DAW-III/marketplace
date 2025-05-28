import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Negociacao } from './negociacao.entity';
import { CreateNegociacaoDto } from './dto/createNegociacaoRequest.dto';
import { CreateNegociacaoResponseDto } from './dto/createNegociacaoResponse.dto';
import { updateNegociacaoRequestDto } from './dto/updateNegociacaoRequest.dto';

import { PessoaService } from '../pessoa/pessoa.service';
import { ServicoService } from '../servico/servico.service';


@Injectable()
export class NegociacaoService {
    constructor(
        @Inject('NEGOCIACAO_REPOSITORY')
        private negociacaoRepository: Repository<Negociacao>,
        private readonly pessoaService: PessoaService,
        private readonly servicoService: ServicoService
    ) {}

    async findAll(): Promise<Negociacao[]> {
        return this.negociacaoRepository.find();
    }

    async findOne(id: string): Promise<Negociacao> {
        const negociacao = await this.negociacaoRepository.findOne({ where: { id } });
        if (!negociacao) {
            throw new NotFoundException('Negociação não encontrada');
        }
        return negociacao;
    }

    async create(request: CreateNegociacaoDto): Promise<CreateNegociacaoResponseDto> {
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

    async update(id: string, updateDto: updateNegociacaoRequestDto): Promise<Negociacao> {
        const negociacao = await this.findOne(id);
        Object.assign(negociacao, updateDto);
        return this.negociacaoRepository.save(negociacao);
    }

    async remove(id: string): Promise<void> {
        const negociacao = await this.findOne(id);
        await this.negociacaoRepository.remove(negociacao);
    }
}
