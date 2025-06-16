import { Module } from '@nestjs/common';
import { AvaliacaoService } from './avaliacao.service';
import { DatabaseModule } from 'src/infra/database.module';
import { AvaliacaoProviders } from 'src/infra/repositories/avaliacao.providers';
import { AvaliacaoController } from 'src/api/controllers/avaliacao.controller';
import { PessoaProviders } from 'src/infra/repositories/pessoa.providers';
import { ServicoProviders } from 'src/infra/repositories/servico.providers';
import { PessoaModule } from '../pessoa/pessoa.module';
import { ServicoModule } from '../servico/servico.module';

@Module({
  imports: [DatabaseModule, PessoaModule, ServicoModule],
  providers: [
    ...AvaliacaoProviders,
    ...PessoaProviders,
    ...ServicoProviders,
    AvaliacaoService,
  ],
  controllers: [AvaliacaoController],
  exports: [AvaliacaoService],
})
export class AvaliacaoModule {}
