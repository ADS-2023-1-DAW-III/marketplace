// src/modules/pessoa/pessoa.service.ts
import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CreatePessoaRequestDTO } from './dto/createPessoaRequest.dto';

@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async create(request: CreatePessoaRequestDTO): Promise<Pessoa> {
    // Retorna Pessoa, não DTO
    const newPessoa: Pessoa = this.pessoaRepository.create(request);
    return this.pessoaRepository.save(newPessoa);
  }

  // Novo método para atualizar o customerId do AbacatePay
  // Novo método para atualizar o customerId do AbacatePay
  async updateAbacatePayCustomerId(
    pessoaId: string,
    abacatePayCustomerId: string,
  ): Promise<Pessoa> {
    const pessoa = await this.pessoaRepository.findOne({
      where: { abacate_id: pessoaId },
    });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa com ID ${pessoaId} não encontrada.`);
    }

    pessoa.abacatePayCustomerId = abacatePayCustomerId;
    return this.pessoaRepository.save(pessoa);
  }

  async findById(username: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({ where: { username } });
  }

  // Adicione um método para buscar por ID, já que o update usa abacate_id
  async findOneById(id: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({ where: { abacate_id: id } });
  }
}
