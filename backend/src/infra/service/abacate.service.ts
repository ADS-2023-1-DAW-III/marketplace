// abacate.service.ts
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import AbacatePay from 'abacatepay-nodejs-sdk';

@Injectable()
export class AbacateService {
  constructor(private readonly configService: ConfigService) {}

  public getClient() {
    const apiKey = this.configService.get<string>('ABACATE_TOKEN');

    console.log(apiKey)

    if (!apiKey) {
      throw new Error('ABACATE_TOKEN is not defined in the environment variables');
    }

    const abacateClient = AbacatePay(apiKey);

    console.log(abacateClient)
    return abacateClient;
  }
}
