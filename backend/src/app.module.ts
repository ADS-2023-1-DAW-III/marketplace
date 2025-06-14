import { Module } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { AbacateController } from './api/controllers/abacate.controller';
import { AbacateModule } from './infra/service/abacate.module';
import { PagamentoModule } from './modules/pagamento/pagamento.module';
import { NegociacaoModule } from './modules/negociacao/negociacao.module';
import { CategoriaModule } from './modules/categoria/categoria.module';
import { PessoaController } from './api/controllers/pessoa.controller';
import { PagamentoController } from './api/controllers/pagamento.controller';
import { NegociacaoController } from './api/controllers/negociacao.controller';
import { CategoriaController } from './api/controllers/categoria.controller';
import { ServicoModule } from './modules/servico/servico.module';
import { HistoricoModule } from './modules/historico/historico.module';
import { ServicoController } from './api/controllers/servico.controller';
import { HistoricoController } from './api/controllers/historico.controller';
import { AuthModule } from './modules/auth/auth.module';
import { AvaliacaoModule } from './modules/avaliacao/avaliacao.module';
import { AvaliacaoController } from './api/controllers/avaliacao.controller';

@Module({
  imports: [
    PessoaModule,
    AbacateModule,
    PagamentoModule,
    NegociacaoModule,
    CategoriaModule,
    ServicoModule,
    HistoricoModule,
    AuthModule,
    AvaliacaoModule,
  ],
  controllers: [
    AbacateController,
    PessoaController,
    PagamentoController,
    NegociacaoController,
    CategoriaController,
    ServicoController,
    HistoricoController,
    AvaliacaoController,
  ],
})
export class AppModule {}
