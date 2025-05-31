import {
  Injectable,
  Inject,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { DeleteResult, Repository } from 'typeorm';
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

  async findAll(): Promise<PessoaResponseDTO[]> {
    const pessoas = await this.pessoaRepository.find();
    return pessoas.map((pessoa) => new PessoaResponseDTO(pessoa));
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

    // o codigo será descomentado para os teste de integração com a api do AbacatePay
    // const response = await this.abacateService.getClient().customer.create({
    //   name: newPessoa.nome,
    //   email: newPessoa.email,
    //   cellphone: newPessoa.contato,
    //   taxId: newPessoa.cpf,
    // });

    // const abacate_id = response.data?.id;

    //  if (abacate_id) {
    //    newPessoa.abacate_id = abacate_id;
    //  }
    newPessoa.abacate_id = '1223';
    await this.pessoaRepository.save(newPessoa);

    const pessoaResponse: PessoaResponseDTO = new PessoaResponseDTO(newPessoa);

    return pessoaResponse;
  }

  async update(
    username: string,
    pessoa: Partial<CreatePessoaRequestDTO>,
  ): Promise<PessoaResponseDTO> {
    const persistPessoa = await this.pessoaRepository.findOne({
      where: { username },
    });

    if (!persistPessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o username: ${username}`,
      );
    }

    Object.assign(persistPessoa, pessoa);

    await this.pessoaRepository.save(persistPessoa);

    return new PessoaResponseDTO(persistPessoa);
  }

  async findById(username: string): Promise<PessoaResponseDTO> {
    const pessoa = await this.pessoaRepository.findOne({ where: { username } });
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o username: ${username}`,
      );
    }
    return new PessoaResponseDTO(pessoa);
  }

  async findByEmail(email: string): Promise<PessoaResponseDTO> {
    const pessoa = await this.pessoaRepository.findOne({ where: { email } });
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o username: ${email}`,
      );
    }
    return new PessoaResponseDTO(pessoa);
  }

  async findInternalPessoaByLogin(login: string): Promise<Pessoa | null> {
    const pessoa = await this.pessoaRepository.findOne({
      where: [{ username: login }, { email: login }],
    });
    return pessoa;
  }

  async delete(username: string): Promise<DeleteResult> {
    return await this.pessoaRepository.delete({ username });
  }
}
