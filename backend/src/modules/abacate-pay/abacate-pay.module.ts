// src/modules/abacate-pay/abacate-pay.module.ts
import { Module } from '@nestjs/common';
import { AbacatePayService } from './abacate-pay.service';

@Module({
  providers: [AbacatePayService],
  exports: [AbacatePayService], // Exporte o serviço para que ele possa ser usado em outros módulos
})
export class AbacatePayModule {}
