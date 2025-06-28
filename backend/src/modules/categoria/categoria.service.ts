import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { In, Repository } from 'typeorm';
import { Categoria } from './categoria.entity';
import { CreateCategoriaDto } from './dto/createCategoriaRequest.dto';
import { UpdateCategoriaRequestDto } from './dto/updateCategoriaRequest.dto';
import { CreateCategoriaResponseDto } from './dto/createCategoriaResponse.dto';

@Injectable()
export class CategoriaService {
  constructor(
    @Inject('CATEGORIA_REPOSITORY')
    private categoriaRepository: Repository<Categoria>,
  ) {}

  async create(dto: CreateCategoriaDto): Promise<CreateCategoriaResponseDto> {
    const categoria = this.categoriaRepository.create(dto);
    const saved = await this.categoriaRepository.save(categoria);
    return new CreateCategoriaResponseDto(saved);
  }

  async findAll(): Promise<Categoria[]> {
    return this.categoriaRepository.find({ relations: ['servicos'] });
  }

  async findOne(nome: string): Promise<CreateCategoriaResponseDto> {
    const categoria = await this.categoriaRepository.findOne({
      where: { nome },
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoria com nome "${nome}" não encontrada.`,
      );
    }
    return new CreateCategoriaResponseDto(categoria);
  }

  async update(
    nome: string,
    dto: UpdateCategoriaRequestDto,
  ): Promise<Categoria> {
    const categoria = await this.categoriaRepository.findOneBy({ nome });
    if (!categoria) {
      throw new NotFoundException(
        `Categoria com nome "${nome}" não encontrada.`,
      );
    }

    categoria.descricao = dto.descricao;
    return this.categoriaRepository.save(categoria);
  }

  async remove(nome: string): Promise<void> {
    const categoria = await this.categoriaRepository.findOne({
      where: { nome },
    });
    if (!categoria) {
      throw new NotFoundException(
        `Categoria com nome "${nome}" não encontrada.`,
      );
    }

    await this.categoriaRepository.remove(categoria);
  }

  async findAllByNome(categorias: string[]): Promise<Categoria[]> {
    return this.categoriaRepository.find({
      where: {
        nome: In(categorias),
      },
    });
  }
}
