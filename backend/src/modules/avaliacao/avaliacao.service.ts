import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Avaliacao } from './avaliacao.entity';
import { AvaliacaoRequestDTO } from './dto/AvaliacaoRequest.dto';
import { AvaliacaoResponseDTO } from './dto/AvaliacaoResponse.dto';
import { PessoaService } from '../pessoa/pessoa.service';
import { ServicoService } from '../servico/servico.service';

@Injectable()
export class AvaliacaoService {
  constructor(
    @Inject('AVALIACAO_REPOSITORY')
    private avaliacaoRepository: Repository<Avaliacao>,
    private readonly pessoaService: PessoaService,
    private readonly servicoService: ServicoService,
  ) {}

  async create(
    createDto: AvaliacaoRequestDTO,
    id_pessoa: string,
    id_servico: string,
  ): Promise<AvaliacaoResponseDTO> {
    const pessoa = await this.pessoaService.findById(id_pessoa);
    const servico = await this.servicoService.findById(id_servico);

    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o ID: ${id_pessoa}`,
      );
    }

    if (!servico) {
      throw new NotFoundException(
        `Serviço não encontrado com o ID: ${id_servico}`,
      );
    }

    const novoAvaliacao = this.avaliacaoRepository.create({
      ...createDto,
      pessoa: pessoa,
      servico: servico,
    });

    const avaliacaoSalvo = await this.avaliacaoRepository.save(novoAvaliacao);
    return new AvaliacaoResponseDTO(avaliacaoSalvo);
  }

  async findAll(): Promise<AvaliacaoResponseDTO[]> {
    const avaliacoes = await this.avaliacaoRepository.find();
    return avaliacoes.map((avaliacao) => new AvaliacaoResponseDTO(avaliacao));
  }

  async findOne(id: string): Promise<AvaliacaoResponseDTO> {
    const avaliacao = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['avaliacao'],
    });

    if (!avaliacao) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrado`);
    }

    return new AvaliacaoResponseDTO(avaliacao);
  }

  async update(
    id: string,
    updateDto: AvaliacaoRequestDTO,
  ): Promise<AvaliacaoResponseDTO> {
    const exists = await this.avaliacaoRepository.exist({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Avaliação com ID ${id} não encontrado`);
    }

    await this.avaliacaoRepository.update(id, updateDto);
    const updated = await this.avaliacaoRepository.findOne({
      where: { id },
      relations: ['pessoa'],
    });

    return new AvaliacaoResponseDTO(updated!);
  }

  async remove(id: string): Promise<void> {
    await this.avaliacaoRepository.delete(id);
  }

  async findById(id: string): Promise<Avaliacao | null> {
    return this.avaliacaoRepository.findOne({ where: { id } });
  }
}
