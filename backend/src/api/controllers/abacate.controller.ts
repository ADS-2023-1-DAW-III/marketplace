import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AbacateService, BillingData } from 'src/infra/service/abacate.service';

/**
 * Controller apenas para testes do service do AbacatePay - NÃO DEVE SER UTILIZADO
 */
@Controller('abacate')
export class AbacateController {
  constructor(private readonly abacateService: AbacateService) {}

  @Post('pessoa')
  @HttpCode(200)
  createPessoa(): Promise<void> {
    return this.abacateService.createCustomer(
      'João Lucas de Brito Ramalho Silva',
      '(11) 4002-8922',
      'lucasteste@gmail.com',
      '220.002.720-61',
    );
  }

  @Post('cobranca')
  @HttpCode(200)
  createCobranca(): Promise<BillingData | undefined> {
    return this.abacateService.createBilling({
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
      customerId: 'cust_GYSMaHMz4jG0JjyQpgTRyAgT',
    });
  }
}
