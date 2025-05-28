import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { NegociacaoProviders } from '../../infra/repositories/negociacao.providers';
import { NegociacaoService } from './negociacao.service';
import { NegociacaoController } from '../../api/controllers/negociacao.controller';
import { PessoaModule } from '../pessoa/pessoa.module';
import { ServicoModule } from '../servico/servico.module';


@Module({
  imports: [DatabaseModule, PessoaModule, ServicoModule], 
  providers: [...NegociacaoProviders, NegociacaoService],
  controllers: [NegociacaoController],
  exports: [NegociacaoService],
})
export class NegociacaoModule {}
