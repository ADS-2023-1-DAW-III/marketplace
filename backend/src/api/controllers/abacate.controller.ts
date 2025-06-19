import { Body, Controller, Post, HttpCode, UseGuards } from '@nestjs/common';
import {
  CreateBillingResponse,
  CreateCustomerResponse,
} from 'abacatepay-nodejs-sdk/dist/types';
import { AbacateService } from 'src/infra/service/abacate.service';
import { AuthGuard } from '@nestjs/passport';

/**
 * Controller apenas para testes do service do AbacatePay - NÃO DEVE SER UTILIZADO
 */
@Controller('abacate')
export class AbacateController {
  constructor(private readonly abacateService: AbacateService) {}

  @Post('pessoa')
  @HttpCode(200)
  createPessoa(): Promise<CreateCustomerResponse> {
    return this.abacateService.getClient().customer.create({
      name: 'João da Silva',
      cellphone: '11999999999',
      email: 'joaodasilva@email.com',
      taxId: '66025361096',
    });
  }

  @Post('cobranca')
  @HttpCode(200)
  createCobranca(): Promise<CreateBillingResponse> {
    return this.abacateService.getClient().billing.create({
      frequency: 'ONE_TIME',
      methods: ['PIX'],
      products: [
        {
          externalId: 'prod-1234',
          name: 'Assinatura de Programa Fitness',
          description: 'Acesso ao programa fitness premium por 1 mês.',
          quantity: 2,
          price: 2000,
        },
      ],
      returnUrl: 'https://example.com/billing',
      completionUrl: 'https://example.com/completion',
      customerId: 'cust_w2XUsApAWdA0XAgeDNDGS3re',
    });
  }
}
