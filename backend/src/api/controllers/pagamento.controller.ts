import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  HttpStatus,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { PagamentoService } from '../../modules/pagamento/pagamento.service';
import { UpdatePagamentoDto } from '../../modules/pagamento/dto/updatePagamentoRequest.dto';
import { CreatePagamentoDto } from '../../modules/pagamento/dto/createPagamentoRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import {
  PagamentoDetalheResponseDTO,
  PagamentoHistoricoResponseDTO,
  PagamentoResponseDto,
} from 'src/modules/pagamento/dto/pagamentoResponse.dto';

@ApiTags('pagamentos')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('pagamentos')
export class PagamentoController {
  constructor(
    private readonly pagamentoService: PagamentoService,
    private readonly pessoaService: PessoaService, // Injetado para buscar o abacate_id da pessoa
  ) {}

  /**
   * Endpoint: Realizar Pagamento
   * POST /pagamentos
   * Cria um novo registro de pagamento no sistema e no AbacatePay, retornando a URL de pagamento.
   */
  @ApiResponse({
    status: 201,
    description:
      'Pagamento criado com sucesso. Retorna o ID do pagamento e a URL para a tela de pagamento do AbacatePay.',
    schema: {
      properties: {
        message: { type: 'string', example: 'Pagamento criado com sucesso' },
        pagamento_id: {
          type: 'string',
          example: '550e8400-e29b-41d4-a716-446655440000',
        },
        url: {
          type: 'string',
          example: 'https://abacatepay.com/pagamento/xyz',
        },
      },
    },
  })
  @ApiResponse({
    status: 400,
    description: 'Dados inválidos (falta de parâmetros ou valor inválido).',
  })
  @ApiResponse({
    status: 404,
    description: 'Pessoa não encontrada ou sem ID de cliente AbacatePay.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao criar o pagamento.',
  })
  @Post()
  @HttpCode(HttpStatus.CREATED)
  async realizarPagamento(
    @Body() request: CreatePagamentoDto,
  ): Promise<{ message: string; pagamento_id: string; url: string }> {
    return this.pagamentoService.realizarPagamento(request);
  }

  /**
   * Endpoint: Buscar Histórico de Pagamentos
   * GET /pagamentos/historico/:id_pessoa
   * Retorna o histórico de pagamentos (pagos ou recebidos) associados ao ID da pessoa.
   */
  @ApiResponse({
    status: 200,
    description: 'Histórico de pagamentos retornado com sucesso.',
    type: PagamentoHistoricoResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou ausente.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar o histórico.',
  })
  @Get('historico/:id_pessoa')
  @HttpCode(HttpStatus.OK)
  async buscarHistoricoPagamentos(
    @Param('id_pessoa') id_pessoa: string,
  ): Promise<{ message: string; pagamentos: PagamentoResponseDto[] }> {
    return this.pagamentoService.buscarHistoricoPagamentos(id_pessoa);
  }

  /**
   * Endpoint: Buscar Pagamento por ID
   * GET /pagamentos/:id
   * Retorna os detalhes de um pagamento específico com base no ID do pagamento.
   */
  @ApiResponse({
    status: 200,
    description: 'Pagamento encontrado.',
    type: PagamentoDetalheResponseDTO,
  })
  @ApiResponse({
    status: 401,
    description: 'Token inválido ou ausente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Pagamento não encontrado.',
  })
  @ApiResponse({
    status: 500,
    description: 'Erro ao buscar o pagamento.',
  })
  @Get(':id')
  @HttpCode(HttpStatus.OK)
  async buscarPagamentoPorId(
    @Param('id') id: string,
  ): Promise<{ message: string; pagamento: PagamentoResponseDto }> {
    return this.pagamentoService.buscarPagamentoPorId(id);
  }

  @ApiResponse({
    status: 201,
    description: 'Cobranca do AbacatePay criada com sucesso',
    // Usando CreateBillingResponse do SDK, você pode querer mapear isso para um DTO local
    type: Object,
  })
  @Post(':pessoaUsername/cobranca') // Conflito de rota com o `POST /pagamentos` se `pessoaUsername` for opcional.
  @HttpCode(HttpStatus.CREATED)
  async criarCobrancaParaPessoa(
    @Param('pessoaUsername') pessoaUsername: string,

    @Body() billingDetails: Omit<any, 'customerId'>,
  ): Promise<any> {
    const pessoa = await this.pessoaService.findById(pessoaUsername);

    if (!pessoa || !pessoa.abacate_id) {
      throw new NotFoundException(
        'Cliente AbacatePay não encontrado para esta pessoa. Certifique-se de que a pessoa foi criada com sucesso no AbacatePay.',
      );
    }

    const dataToCreateBilling: any = {
      customerId: pessoa.abacate_id,
      ...billingDetails,
    };

    return this.pagamentoService.createBilling(dataToCreateBilling);
  }

  @ApiResponse({
    status: 200,
    description:
      'Lista todos os pagamentos (genérico, pode ser otimizado para a issue "Histórico")',
    type: [PagamentoResponseDto],
  })
  @Get('all')
  findAllPagamentosGenerico() {
    return this.pagamentoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description:
      'Retorna um pagamento específico por ID (genérico, similar a "Buscar Pagamento por ID")',
    type: PagamentoResponseDto,
  })
  @Get('id/:id')
  findOnePagamentoGenerico(@Param('id') id: string) {
    return this.pagamentoService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza um pagamento pelo id',
    type: PagamentoResponseDto,
  })
  @ApiBody({
    type: UpdatePagamentoDto,
  })
  @Put(':id')
  updatePagamento(@Param('id') id: string, @Body() dto: UpdatePagamentoDto) {
    return this.pagamentoService.update(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remoção do pagamento com sucesso',
  })
  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  removePagamento(@Param('id') id: string) {
    return this.pagamentoService.remove(id);
  }
}
