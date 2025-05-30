import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CreatePessoaRequestDTO } from './dto/createPessoaRequest.dto';
import { CreatePessoaResponseDTO } from './dto/createPessoaResponse.dto';

@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<Pessoa>,
  ) {}

  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async create(
    request: CreatePessoaRequestDTO,
  ): Promise<CreatePessoaResponseDTO> {
    
    const newPessoa: Pessoa = this.pessoaRepository.create(request);

    await this.pessoaRepository.save(newPessoa);

    const pessoaResponse: CreatePessoaResponseDTO = new CreatePessoaResponseDTO(
      newPessoa,
    );

    return pessoaResponse;
  }

  async findById(username: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({ where: { username } });
  }
}
