// abacate.module.ts
import { Module } from '@nestjs/common';
import { AbacateController } from '../../api/controllers/abacate.controller';
import { AbacateService } from './abacate.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [AbacateController],
  providers: [AbacateService],
  exports: [AbacateService],
})
export class AbacateModule {}
