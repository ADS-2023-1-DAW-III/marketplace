import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { AvaliacaoProviders } from '../../infra/repositories/avaliacao.providers';
import { AvaliacaoService } from './avaliacao.service';
import { AvaliacaoController } from '../../api/controllers/avaliacao.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...AvaliacaoProviders, AvaliacaoService],
  controllers: [AvaliacaoController],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}