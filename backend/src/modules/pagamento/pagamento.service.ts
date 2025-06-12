import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pagamento } from './pagamento.entity';
import { CreatePagamentoDto } from './dto/createPagamentoRequest.dto';
import { PagamentoResponseDto } from './dto/pagamentoResponse.dto';
import { UpdatePagamentoDto } from './dto/updatePagamentoRequest.dto';

@Injectable()
export class PagamentoService {
  constructor(
    @Inject('PAGAMENTO_REPOSITORY')
    private readonly pagamentoRepository: Repository<Pagamento>,
  ) {}

  async create(dto: CreatePagamentoDto): Promise<PagamentoResponseDto> {
    const pagamento = this.pagamentoRepository.create(dto);
    return await this.pagamentoRepository.save(pagamento);
  }

  async findAll(): Promise<PagamentoResponseDto[]> {
    return await this.pagamentoRepository.find();
  }

  async findOne(id: string): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoRepository.findOne({ where: { id } });
    if (!pagamento)
      throw new NotFoundException(`Pagamento ${id} não encontrado`);
    return pagamento;
  }

  async update(
    id: string,
    dto: UpdatePagamentoDto,
  ): Promise<PagamentoResponseDto> {
    const pagamento = await this.findOne(id);
    Object.assign(pagamento, dto);
    return await this.pagamentoRepository.save(pagamento);
  }

  async remove(id: string): Promise<void> {
    const pagamento = await this.findOne(id);
    await this.pagamentoRepository.remove(pagamento);
  }
}
