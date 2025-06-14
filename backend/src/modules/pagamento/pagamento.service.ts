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
import {
  CreateBillingData,
  CreateBillingResponse,
} from 'abacatepay-nodejs-sdk/dist/types';
import { PessoaService } from '../pessoa/pessoa.service';
import { AbacateService } from 'src/infra/service/abacate.service';
import { PagamentoResponseDto } from './dto/pagamentoResponse.dto';
import { ServicoService } from '../servico/servico.service';

@Injectable()
export class PagamentoService {
  constructor(
    @Inject('PAGAMENTO_REPOSITORY')
    private pagamentoRepository: Repository<Pagamento>,
    private readonly abacateService: AbacateService,
    private readonly pessoaService: PessoaService,
    private readonly servicoService: ServicoService,
  ) { }

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

    // Busca a Pessoa para obter o abacate_id (ID do cliente no AbacatePay)
    const pessoa = await this.pessoaService.findById(id_pessoa);
    if (!pessoa || !pessoa.abacate_id) {
      throw new NotFoundException(
        'Pessoa não encontrada ou sem ID de cliente AbacatePay. Certifique-se de que a pessoa foi criada com sucesso no AbacatePay.',
      );
    }

    // Cria a cobrança no AbacatePay
    let abacatePayBillingResponse;
    try {
      abacatePayBillingResponse = await this.abacateService
        .getClient()
        .billing.create({
          customerId: pessoa.abacate_id,
          frequency: 'ONE_TIME', // Assumindo pagamento único
          methods: ['PIX'], // Métodos de pagamento aceitos
          products: [
            {
              externalId: id_servico, // ID do seu serviço
              name: `Pagamento do Serviço ${id_servico}`, // Nome do produto na fatura
              description: `Pagamento do serviço com ID ${id_servico} para ${pessoa.nome}.`, // Descrição do produto
              quantity: 1,
              price: Math.round(valor * 100), // AbacatePay espera o valor em centavos
            },
          ],
          // URLs de retorno após o pagamento, ajuste para o seu frontend
          returnUrl: `https://seusite.com/pagamento/sucesso?id_pagamento=${id_servico}`,
          completionUrl: `https://seusite.com/pagamento/completo?id_pagamento=${id_servico}`,
          // notificationUrl: `https://suaapi.com/webhooks/abacatepay`, // URL para receber notificações de status (importante para atualizar o status do pagamento)
        });

      if (
        !abacatePayBillingResponse ||
        !abacatePayBillingResponse.data ||
        !abacatePayBillingResponse.data.id ||
        !abacatePayBillingResponse.data.paymentUrl
      ) {
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

    // 4. Salvar o registro do pagamento no seu banco de dados
    const novoPagamento = this.pagamentoRepository.create({
      id_abacate: abacatePayBillingResponse.data.id, // ID da cobrança no AbacatePay
      valor: valor,
      data: new Date(),
      status: PaymentStatus.PENDING, // O status inicial é PENDENTE
      id_pessoa: id_pessoa,
      id_servico: id_servico,
      paymentUrl: abacatePayBillingResponse.data.paymentUrl,
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
      order: { data: 'DESC' }, // Ordena por data mais recente
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

    // Opcional: Atualizar o status do pagamento consultando o AbacatePay antes de retornar
    // Isso é útil para ter o status mais atualizado, mas pode gerar latência.
    // O ideal para atualizações de status é usar webhooks do AbacatePay.
    /*
    const abacatePayStatusResponse = await this.abacateService
      .getClient()
      .billing.get(pagamento.id_abacate); // Assumindo que billing.get existe no SDK
    if (
      abacatePayStatusResponse &&
      abacatePayStatusResponse.data &&
      abacatePayStatusResponse.data.status
    ) {
      // Mapear o status do AbacatePay para seu PaymentStatus enum se necessário
      // Exemplo:
      // if (abacatePayStatusResponse.data.status === 'PAID') {
      //   pagamento.status = PaymentStatus.PAGO;
      //   await this.pagamentoRepository.save(pagamento); // Salvar a atualização do status
      // }
      console.log(`Status AbacatePay para ${pagamento.id_abacate}:`, abacatePayStatusResponse.data.status);
    }
    */

    return {
      message: 'Pagamento encontrado',
      pagamento: new PagamentoResponseDto(pagamento),
    };
  }

  /**
   * Cria uma cobrança diretamente no AbacatePay sem salvar no DB local.
   * (Método auxiliar, pode ser removido se não for usado diretamente por outros serviços/controllers).
   * @param data Dados da cobrança para o AbacatePay.
   * @returns Resposta da API do AbacatePay.
   */
  async createBilling(data: CreateBillingData): Promise<CreateBillingResponse> {
    try {
      console.log('Tentando criar cobrança no AbacatePay com:', data);
      const response = await this.abacateService
        .getClient()
        .billing.create(data);
      console.log('Resposta de Cobrança do AbacatePay:', response);
      if (!response || response.error) {
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
   * Retorna todos os pagamentos (método genérico findAll).
   * @returns Lista de todos os pagamentos.
   */
  async findAll(): Promise<PagamentoResponseDto[]> {
    const pagamentos = await this.pagamentoRepository.find();
    return pagamentos.map((pagamento) => new PagamentoResponseDto(pagamento));
  }

  /**
   * Retorna um pagamento específico por ID (método genérico findOne).
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

    // Aplica as atualizações do DTO ao objeto do pagamento
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
    if (!pagamento) throw new NotFoundException(`Pagamento ${id} não encontrado`);
    await this.pagamentoRepository.remove(pagamento);
  }
}
