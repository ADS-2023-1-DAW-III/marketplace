import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Historico } from './historico.entity';
import { CreateHistoricoRequestDto } from './dto/createHistoricoRequest.dto';
import { HistoricoResponseDto } from './dto/createHistoricoResponse.dto';
import { UpdateHistoricoRequestDto } from './dto/updateHistoricoRequest.dto';
import { Pessoa } from '../pessoa/pessoa.entity';
import { Servico } from '../servico/servico.entity';

@Injectable()
export class HistoricoService {
    constructor(
        @Inject('HISTORICO_REPOSITORY')
        private readonly historicoRepository: Repository<Historico>,
         @Inject('PESSOA_REPOSITORY')
         private readonly pessoaRepository: Repository<Pessoa>,
         @Inject('SERVICO_REPOSITORY')
         private readonly servicoRepository: Repository<Servico>,
    ) {}

    async create(dto: CreateHistoricoRequestDto): Promise<HistoricoResponseDto> {
         const pessoa = await this.pessoaRepository.findOneBy({ username: dto.id_pessoa });
         const servico = await this.servicoRepository.findOneBy({ id: dto.id_servico });

         if (!pessoa || !servico) {
             throw new NotFoundException('Pessoa ou serviço não encontrado.');
         }

        const historico = this.historicoRepository.create({
            data: dto.data,
             pessoa,
             servico
        });

        const saved = await this.historicoRepository.save(historico);
        return new HistoricoResponseDto(saved);
    }

    async findAll(): Promise<HistoricoResponseDto[]> {
        const historicos = await this.historicoRepository.find({
            relations: ['pessoa', 'servico'],
        });
        return historicos.map((h) => new HistoricoResponseDto(h));
    }

    async findOne(id: number): Promise<HistoricoResponseDto> {
        const historico = await this.historicoRepository.findOne({
            where: { id },
            relations: ['pessoa', 'servico'],
        });
        if (!historico) {
            throw new NotFoundException(`Histórico com ID ${id} não encontrado.`);
        }
        return new HistoricoResponseDto(historico);
    }

    async update(id: number, dto: UpdateHistoricoRequestDto): Promise<HistoricoResponseDto> {
        const historico = await this.historicoRepository.findOne({
            where: { id },
            relations: ['pessoa', 'servico'],
        });

        if (!historico) {
            throw new NotFoundException(`Histórico com ID ${id} não encontrado.`);
        }
        if (dto.data) historico.data = dto.data;
        
         if (dto.id_pessoa) {
             const pessoa = await this.pessoaRepository.findOneBy({ username: dto.id_pessoa });
             if (!pessoa) throw new NotFoundException('Pessoa não encontrada.');
             historico.pessoa = pessoa;
         }

         if (dto.id_servico) {
             const servico = await this.servicoRepository.findOneBy({ id: dto.id_servico });
             if (!servico) throw new NotFoundException('Serviço não encontrado.');
             historico.servico = servico;
         }

        const updated = await this.historicoRepository.save(historico);
        return new HistoricoResponseDto(updated);
    }

    async remove(id: number): Promise<void> {
        const historico = await this.historicoRepository.findOneBy({ id });
        if (!historico) {
            throw new NotFoundException(`Histórico com ID ${id} não encontrado.`);
        }
        await this.historicoRepository.remove(historico);
    }
}