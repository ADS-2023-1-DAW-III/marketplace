// src/modules/abacate-pay/abacate-pay.service.ts
import { Injectable, InternalServerErrorException } from '@nestjs/common';
// O caminho abaixo depende de onde você colocou o arquivo AbacatePay.js/ts
// Ajuste o caminho real para a sua lib AbacatePay e seus tipos

import AbacatePay from 'abacatepay-nodejs-sdk';
import {
  CreateCustomerData,
  CreateCustomerResponse,
} from 'abacatepay-nodejs-sdk/dist/types';

@Injectable()
export class AbacatePayService {
  private abacatePayClient: ReturnType<typeof AbacatePay>;

  constructor() {
    // É crucial obter a chave da API de uma variável de ambiente por segurança
    const apiKey = 'abc_dev_N33FzdeypW2BdERLNjCJbzA6';

    if (!apiKey) {
      throw new InternalServerErrorException(
        'ABACATEPAY_API_KEY não está definida nas variáveis de ambiente. Por favor, configure-a.',
      );
    }
    this.abacatePayClient = AbacatePay(apiKey);
  }

  /**
   * Cria um novo cliente no AbacatePay.
   * @param data Dados do cliente a serem criados.
   * @returns Resposta da API do AbacatePay ou lança um erro.
   */
  async createCustomer(
    data: CreateCustomerData,
  ): Promise<CreateCustomerResponse> {
    try {
      console.log('Tentando criar cliente no AbacatePay com:', data);
      const response = await this.abacatePayClient.customer.create(data);
      console.log('Resposta do AbacatePay:', response);
      return response;
    } catch (error) {
      console.error(
        'Erro ao criar cliente no AbacatePay:',
        error.message,
        error.stack,
      );
      throw new InternalServerErrorException(
        'Falha ao integrar com AbacatePay para criar cliente.',
      );
    }
  }
}
