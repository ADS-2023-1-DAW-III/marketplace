import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { PagamentoProviders } from '../../infra/repositories/pagamento.providers';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from '../../api/controllers/pagamento.controller';
import { AbacateModule } from 'src/infra/service/abacate.module';
import { PessoaModule } from '../pessoa/pessoa.module';
import { ServicoModule } from '../servico/servico.module';

@Module({
  imports: [DatabaseModule, AbacateModule, PessoaModule, ServicoModule],
  providers: [...PagamentoProviders, PagamentoService],
  controllers: [PagamentoController],
  exports: [PagamentoService],
})
export class PagamentoModule {}
