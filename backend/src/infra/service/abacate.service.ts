import { Injectable } from '@nestjs/common';
import AbacatePay from 'abacatepay-nodejs-sdk';

/**
 * Serviço responsável por fornecer uma instância da SDK do AbacatePay.
 *
 * Veja mais detalhes na documentação externa:
 * @see https://github.com/AbacatePay/abacatepay-nodejs-sdk
 */
@Injectable()
export class AbacateService {
  public getClient() {
    const abacateClient = AbacatePay('ALTERE AQUI');

    return abacateClient;
  }
}
