import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';


@Injectable()
export class ServicoService {
    constructor(
        @Inject('SERVICO_REPOSITORY')
        private servicoRepository: Repository<Servico>,
    ) {}

    async findAll(): Promise<Servico[]> {
        return this.servicoRepository.find();
    }

    async findById(id: string): Promise<Servico | null> {
        return this.servicoRepository.findOne({ where: { id } });
    }

}