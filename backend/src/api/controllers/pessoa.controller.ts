// src/api/controllers/pessoa.controller.ts

import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Req,
  InternalServerErrorException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import { Pessoa } from '../../modules/pessoa/pessoa.entity';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { CreatePessoaResponseDTO } from '../../modules/pessoa/dto/createPessoaResponse.dto';
import { AbacatePayService } from '../../modules/abacate-pay/abacate-pay.service';

// Condição para desproteger o endpoint em ambiente de desenvolvimento
// Se process.env.NODE_ENV for 'development', o guard será uma classe mockada que sempre retorna true.
// Caso contrário (produção, staging, etc.), o AuthGuard('jwt') real será usado.
@UseGuards(
  process.env.NODE_ENV === 'development'
    ? class {
        canActivate = () => true;
      } // Mock do guard para DEV
    : AuthGuard('jwt'), // Guard JWT real
)
@Controller('pessoas')
export class PessoaController {
  constructor(
    private readonly pessoaService: PessoaService,
    private readonly abacatePayService: AbacatePayService,
  ) {}

  @Get()
  async findAll(@Req() req): Promise<Pessoa[]> {
    // A logica abaixo serve para mostrar o status do guard em diferentes ambientes
    console.log('Ambiente:', process.env.NODE_ENV);
    if (process.env.NODE_ENV !== 'development' && req.user) {
      console.log('Usuário autenticado:', req.user);
    } else if (process.env.NODE_ENV === 'development') {
      console.log('Acessando /pessoas (GET) sem autenticação em DEV.');
    } else {
      console.log('Acessando /pessoas (GET) e não autenticado (fora de DEV).');
    }
    return this.pessoaService.findAll();
  }

  @Post()
  @HttpCode(201) // 201 Created é mais semântico para a criação de recursos
  async createPessoa(
    @Body() request: CreatePessoaRequestDTO,
  ): Promise<CreatePessoaResponseDTO> {
    let createdPessoa: Pessoa;
    let abacatePayCustomerId: string | undefined;

    try {
      // 1. Salvar a pessoa no seu banco de dados
      // A senha deve ser hashed ANTES de salvar no DB. Isso deve ser feito no service ou em um pipeline
      // Por simplicidade, assumindo que já está sendo hashed antes de chegar aqui ou no PessoaService
      createdPessoa = await this.pessoaService.create(request);
      console.log(
        'Pessoa salva no banco de dados com ID:',
        createdPessoa.abacate_id,
      );

      // 2. Criar o cliente no AbacatePay
      const abacatePayCustomerData = {
        name: request.username,
        cellphone: request.cellphone,
        email: request.email,
        taxId: request.taxId,
      };

      const abacatePayResponse = await this.abacatePayService.createCustomer(
        abacatePayCustomerData,
      );

      // 3. Opcional: Atualizar a pessoa no seu banco de dados com o ID do cliente do AbacatePay
      // CORREÇÃO: A propriedade 'id' está dentro de 'data' se a resposta for de sucesso
      if (
        abacatePayResponse &&
        abacatePayResponse.data &&
        abacatePayResponse.data.id
      ) {
        abacatePayCustomerId = abacatePayResponse.data.id; // Corrigido aqui
        await this.pessoaService.updateAbacatePayCustomerId(
          createdPessoa.abacate_id,
          abacatePayCustomerId,
        );
        createdPessoa.abacatePayCustomerId = abacatePayCustomerId; // Atualiza o objeto em memória
        console.log(
          'Cliente criado no AbacatePay com ID:',
          abacatePayCustomerId,
        );
      } else {
        console.warn(
          'AbacatePay não retornou um ID de cliente válido. A criação no AbacatePay pode ter falhado ou retornado uma resposta inesperada:',
          abacatePayResponse,
        );
        // Se abacatePayResponse.error existir, você pode logar/tratar o erro específico do AbacatePay
        if (abacatePayResponse && abacatePayResponse.error) {
          console.error(
            'Erro detalhado do AbacatePay:',
            abacatePayResponse.error,
          );
        }
      }

      // Retornar os dados da pessoa criada (e o ID do AbacatePay, se disponível)
      return new CreatePessoaResponseDTO(createdPessoa);
    } catch (error) {
      console.error(
        'Erro no fluxo de criação da pessoa e cliente AbacatePay:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Falha ao criar pessoa ou cliente no AbacatePay.',
      );
    }
  }
}
