import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { DatabaseModule } from 'src/infra/database.module';
import { AvaliacaoProviders } from 'src/infra/repositories/avaliacao.providers';
import { AvaliacaoController } from 'src/api/controllers/avaliacao.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...AvaliacaoProviders, AvaliacaoService],
  controllers: [AvaliacaoController],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}