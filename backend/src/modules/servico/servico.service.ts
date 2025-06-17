import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Servico } from './servico.entity';
import { CreateServicoRequestDto } from './dto/createServicoRequest.dto';
import { UpdateServicoRequestDto } from './dto/updateServicoRequest.dto';
import { ServicoResponseDto } from './dto/createServicoResponse.dto';
import { extname } from 'path';

@Injectable()
export class ServicoService {
  constructor(
    @Inject('SERVICO_REPOSITORY')
    private servicoRepository: Repository<Servico>,
  ) {}

  async create(
    createDto: CreateServicoRequestDto,
    file?: Express.Multer.File,
  ): Promise<ServicoResponseDto> {
    const newServico = this.servicoRepository.create(createDto);

    if (file) {
      newServico.caminhoImagem = `serviceImage${extname(file.originalname)}`;
    }

    const servicoSalvo = await this.servicoRepository.save(newServico);
    return new ServicoResponseDto(servicoSalvo);
  }

  async findAll(): Promise<ServicoResponseDto[]> {
    const servicos = await this.servicoRepository.find();
    return servicos.map((servico) => new ServicoResponseDto(servico));
  }

  async findOne(id: string): Promise<ServicoResponseDto> {
    const servico = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa'],
    });

    if (!servico) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    return new ServicoResponseDto(servico);
  }

  async update(
    id: string,
    updateDto: UpdateServicoRequestDto,
  ): Promise<ServicoResponseDto> {
    const exists = await this.servicoRepository.exist({ where: { id } });
    if (!exists) {
      throw new NotFoundException(`Serviço com ID ${id} não encontrado`);
    }

    await this.servicoRepository.update(id, updateDto);
    const updated = await this.servicoRepository.findOne({
      where: { id },
      relations: ['pessoa'],
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
