import {
  Injectable,
  Inject,
  NotFoundException,
  ConflictException,
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
  ) { }

  async findAll(): Promise<PessoaResponseDTO[]> {
    const pessoas = await this.pessoaRepository.find();
    return pessoas.map((pessoa) => new PessoaResponseDTO(pessoa));
  }

  async create(request: CreatePessoaRequestDTO): Promise<PessoaResponseDTO> {
    const existingUser = await this.pessoaRepository.findOne({
      where: { username: request.username },
    });

    if (existingUser) {
      throw new ConflictException(
        'Já existe uma pessoa com esse username cadastrado',
      );
    }

    // 2. Criar a pessoa no seu banco de dados local primeiro
    // Note que CreatePessoaRequestDTO não tem 'cpf' e 'nome' no DTO que você me mandou,
    // mas a entidade Pessoa tem. Ajustei para usar o que está na entidade Pessoa.
    const newPessoa: Pessoa = this.pessoaRepository.create({
      username: request.username,
      nome: request.nome, // Certifique-se de que 'nome' está no DTO ou mapeie de 'username'
      email: request.email,
      senha: request.senha, // Lembre-se de fazer hash da senha antes de salvar em produção!
      contato: request.contato,
      cpf: request.cpf, // <-- Adicione 'cpf' ao CreatePessoaRequestDTO se for obrigatório
      habilidades: request.habilidades
    });

    // O `abacate_id` deve ser gerado pelo AbacatePay. Não deve ser 'null' no DTO.
    // Remover `abacate_id: 'null'` do CreatePessoaRequestDTO ou torná-lo opcional e não enviar.
    newPessoa.abacate_id = '1223'; // Inicializa como null, será preenchido pelo AbacatePay

    // 3. Criar o cliente no AbacatePay
    try {
      const abacatePayResponse = await this.abacateService
        .getClient()
        .customer.create({
          name: newPessoa.nome,
          email: newPessoa.email,
          cellphone: newPessoa.contato,
          taxId: newPessoa.cpf, // <-- É crucial que o CPF esteja presente e validado
        });

      // 4. Se a criação no AbacatePay for bem-sucedida, capture o ID
      if (
        abacatePayResponse &&
        abacatePayResponse.data &&
        abacatePayResponse.data.id
      ) {
        newPessoa.abacate_id = abacatePayResponse.data.id;
        console.log(
          'Cliente criado no AbacatePay com ID:',
          newPessoa.abacate_id,
        );
      } else {
        // Log ou tratamento de erro caso o AbacatePay não retorne um ID.
        // Isso pode significar que o cliente não foi criado lá, mas a pessoa será salva localmente.
        console.warn(
          'Falha ao obter customer ID do AbacatePay ou resposta inesperada:',
          abacatePayResponse,
        );
        if (abacatePayResponse && abacatePayResponse.error) {
          console.error(
            'Erro detalhado do AbacatePay:',
            abacatePayResponse.error,
          );
        }
      }
    } catch (error) {
      console.error(
        'Erro ao integrar com AbacatePay para criar cliente:',
        error.message,
        error.stack,
      );
      // Você pode escolher se quer lançar um erro aqui (e não salvar a pessoa)
      // ou se quer salvar a pessoa mesmo sem o ID do AbacatePay.
      // Por enquanto, vamos salvar a pessoa e logar o erro do AbacatePay.
      // throw new InternalServerErrorException('Falha ao criar cliente no AbacatePay.');
    }

    // 5. Salvar a pessoa no seu banco de dados
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

  async findByUsernameOrEmail(username: string, email: string) {
    const pessoa = await this.pessoaRepository.findOne({
      where: [{ username, email }],
    });

    if (!pessoa) {
      throw new NotFoundException(`Pessoa não encontrada.`);
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
