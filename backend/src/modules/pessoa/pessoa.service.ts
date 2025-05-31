import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pessoa } from './pessoa.entity';
import { CreatePessoaRequestDTO } from './dto/createPessoaRequest.dto';
import { PessoaResponseDTO } from './dto/pessoaResponse.dto';
import { AbacateService } from 'src/infra/service/abacate.service';

@Injectable()
export class PessoaService {
  constructor(
    @Inject('PESSOA_REPOSITORY')
    private pessoaRepository: Repository<Pessoa>,
    private readonly abacateService: AbacateService,
  ) {}

  async findAll(): Promise<Pessoa[]> {
    return this.pessoaRepository.find();
  }

  async create(request: CreatePessoaRequestDTO): Promise<PessoaResponseDTO> {
    const newPessoa: Pessoa = this.pessoaRepository.create(request);

    const existingUser = await this.pessoaRepository.findOne({
      where: { username: request.username },
    });

    if (existingUser) {
      throw new BadRequestException(
        'Já existe uma pessoa com esse username cadastrado',
      );
    }

    // const response = await this.abacateService.getClient().customer.create({
    //   name: newPessoa.nome,
    //   email: newPessoa.email,
    //   cellphone: newPessoa.contato,
    //   taxId: newPessoa.cpf,
    // });

    // // const abacate_id = response.data?.id;

    // // if (abacate_id) {
    // //   newPessoa.abacate_id = abacate_id;
    // // }
    newPessoa.abacate_id = '1223';
    await this.pessoaRepository.save(newPessoa);

    const pessoaResponse: PessoaResponseDTO = new PessoaResponseDTO(newPessoa);

    return pessoaResponse;
  }

  async findById(username: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({ where: { username } });
  }

  async findByEmail(email: string): Promise<Pessoa | null> {
    return this.pessoaRepository.findOne({ where: { email } });
  }

  async findByUsername(username: string) {
    return this.pessoaRepository.findOne({ where: { username } });
  }
}
