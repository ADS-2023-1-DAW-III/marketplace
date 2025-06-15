import {
  BadRequestException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Pagamento, PaymentStatus } from './pagamento.entity';
import { UpdatePagamentoDto } from './dto/updatePagamentoRequest.dto';
import { CreatePagamentoDto } from './dto/createPagamentoRequest.dto';
import { CreateBillingData, CreateBillingResponse } from 'abacatepay-nodejs-sdk/dist/types';
import { PessoaService } from '../pessoa/pessoa.service';
import AbacatePay from 'abacatepay-nodejs-sdk';
import { PagamentoResponseDto } from './dto/pagamentoResponse.dto';
import { ServicoService } from '../servico/servico.service';
import { AbacateService } from 'src/infra/service/abacate.service';

@Injectable()
export class PagamentoService {
  constructor(
    @Inject('PAGAMENTO_REPOSITORY')
    private pagamentoRepository: Repository<Pagamento>,
    private readonly pessoaService: PessoaService,
    private readonly servicoService: ServicoService,
    private readonly abacateService: AbacateService
  ) {
  }

  /**
   * Realiza um novo pagamento, integrando com o AbacatePay e salvando no banco de dados.
   * @param request DTO com id_pessoa, id_servico e valor.
   * @returns Resposta com mensagem de sucesso, ID do pagamento e URL para tela de pagamento.
   */
  async realizarPagamento(
    request: CreatePagamentoDto,
  ): Promise<{ message: string; pagamento_id: string; url: string }> {
    const { id_pessoa, id_servico, valor } = request;

    if (valor <= 0) {
      throw new BadRequestException(
        'O valor do pagamento deve ser maior que 0.',
      );
    }

    // Busca a Pessoa para obter os dados do cliente
    const pessoa = await this.pessoaService.findById(id_pessoa);
    if (!pessoa) {
      throw new NotFoundException('Pessoa não encontrada.');
    }

    // Cria a cobrança no AbacatePay
    let abacatePayBillingResponse: CreateBillingResponse;
    try {
      const billingData: CreateBillingData = {
        frequency: 'ONE_TIME',
        methods: ['PIX'],
        products: [
          {
            externalId: id_servico,
            name: `Pagamento do Serviço ${id_servico}`,
            description: `Pagamento do serviço com ID ${id_servico} para ${pessoa.nome}.`,
            quantity: 1,
            price: Math.round(valor * 100), // Convert to cents
          },
        ],
        returnUrl: `https://seusite.com/pagamento/sucesso?id_pagamento=${id_servico}`,
        completionUrl: `https://seusite.com/pagamento/completo?id_pagamento=${id_servico}`,
        customerId: pessoa.abacate_id,
      };

      console.log('Dados enviados para AbacatePay:', JSON.stringify(billingData, null, 2));
      console.log('pessoa id ' + pessoa.abacate_id)

      abacatePayBillingResponse = await this.abacateService.getClient().billing.create(billingData);

      // Log da resposta completa para debugging
      console.log('Resposta do AbacatePay:', JSON.stringify(abacatePayBillingResponse, null, 2));

      if (!abacatePayBillingResponse.data?.id || !abacatePayBillingResponse?.data.url) {
        console.error(
          'Resposta inesperada do AbacatePay na criação da cobrança:',
          abacatePayBillingResponse,
        );
        throw new InternalServerErrorException(
          'Falha ao obter ID ou URL de pagamento do AbacatePay.',
        );
      }
    } catch (error) {
      console.error(
        'Erro ao criar cobrança no AbacatePay:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Erro ao integrar com AbacatePay para criar pagamento.',
      );
    }

    // Salvar o registro do pagamento no banco de dados
    const novoPagamento = this.pagamentoRepository.create({
      id_abacate: abacatePayBillingResponse.data.id,
      valor: valor,
      data: new Date(),
      status: PaymentStatus.PENDING,
      id_pessoa: id_pessoa,
      id_negociacao: request.negociacao_id,
      id_servico: id_servico,
      paymentUrl: abacatePayBillingResponse.data.url,
    });

    await this.pagamentoRepository.save(novoPagamento);

    return {
      message: 'Pagamento criado com sucesso',
      pagamento_id: novoPagamento.id,
      url: novoPagamento.paymentUrl,
    };
  }

  /**
   * Retorna o histórico de pagamentos associados a uma pessoa.
   * @param id_pessoa ID da pessoa.
   * @returns Lista de pagamentos.
   */
  async buscarHistoricoPagamentos(
    id_pessoa: string,
  ): Promise<{ message: string; pagamentos: PagamentoResponseDto[] }> {
    const pagamentos = await this.pagamentoRepository.find({
      where: { id_pessoa: id_pessoa },
      order: { data: 'DESC' },
    });

    if (!pagamentos || pagamentos.length === 0) {
      return {
        message: 'Nenhum histórico de pagamentos encontrado para esta pessoa.',
        pagamentos: [],
      };
    }

    const pagamentosDTO = pagamentos.map(
      (pagamento) => new PagamentoResponseDto(pagamento),
    );

    return {
      message: 'Histórico de pagamentos retornado com sucesso',
      pagamentos: pagamentosDTO,
    };
  }

  /**
   * Retorna os detalhes de um pagamento específico.
   * @param id ID do pagamento (UUID).
   * @returns Detalhes do pagamento.
   */
  async buscarPagamentoPorId(
    id: string,
  ): Promise<{ message: string; pagamento: PagamentoResponseDto }> {
    const pagamento = await this.pagamentoRepository.findOne({ where: { id } });

    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado.`);
    }

    return {
      message: 'Pagamento encontrado',
      pagamento: new PagamentoResponseDto(pagamento),
    };
  }

  /**
   * Cria uma cobrança diretamente no AbacatePay sem salvar no DB local.
   * @param data Dados da cobrança para o AbacatePay.
   * @returns Resposta da API do AbacatePay.
   */
  async createBilling(data: CreateBillingData): Promise<CreateBillingResponse> {
    try {
      const response = await this.abacateService.getClient().billing.create(data);
      if (!response) {
        throw new InternalServerErrorException(
          'Resposta inválida do AbacatePay ao criar cobrança.',
        );
      }
      return response;
    } catch (error) {
      console.error(
        'Erro ao criar cobrança no AbacatePay:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Falha ao integrar com AbacatePay para criar cobrança.',
      );
    }
  }

  /**
   * Retorna todos os pagamentos.
   * @returns Lista de todos os pagamentos.
   */
  async findAll(): Promise<PagamentoResponseDto[]> {
    const pagamentos = await this.pagamentoRepository.find();
    return pagamentos.map((pagamento) => new PagamentoResponseDto(pagamento));
  }

  /**
   * Retorna um pagamento específico por ID.
   * @param id ID do pagamento.
   * @returns Detalhes do pagamento.
   */
  async findOne(id: string): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoRepository.findOne({ where: { id } });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado.`);
    }
    return new PagamentoResponseDto(pagamento);
  }

  /**
   * Atualiza os detalhes de um pagamento existente.
   * @param id ID do pagamento a ser atualizado.
   * @param dto DTO com os dados de atualização.
   * @returns Pagamento atualizado.
   */
  async update(
    id: string,
    dto: UpdatePagamentoDto,
  ): Promise<PagamentoResponseDto> {
    const pagamento = await this.pagamentoRepository.findOne({ where: { id } });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado.`);
    }

    Object.assign(pagamento, dto);
    await this.pagamentoRepository.save(pagamento);
    return new PagamentoResponseDto(pagamento);
  }

  /**
   * Remove um pagamento do banco de dados.
   * @param id ID do pagamento a ser removido.
   */
  async remove(id: string): Promise<void> {
    const pagamento = await this.pagamentoRepository.findOne({ where: { id } });
    if (!pagamento) {
      throw new NotFoundException(`Pagamento com ID "${id}" não encontrado`);
    }
    await this.pagamentoRepository.remove(pagamento);
  }
}