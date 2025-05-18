// abacate.module.ts
import { Module } from '@nestjs/common';
import { AbacateController } from '../../api/controllers/abacate.controller';
import { AbacateService } from './abacate.service';

@Module({
  controllers: [AbacateController],
  providers: [AbacateService],
  exports: [AbacateService],
})
export class AbacateModule {}
