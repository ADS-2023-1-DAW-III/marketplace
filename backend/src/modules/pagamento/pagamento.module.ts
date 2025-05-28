import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { PagamentoProviders } from '../../infra/repositories/pagamento.providers';
import { PagamentoService } from './pagamento.service';
import { PagamentoController } from '../../api/controllers/pagamento.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...PagamentoProviders, PagamentoService],
  controllers: [PagamentoController],
  exports: [PagamentoService],
})
export class PagamentoModule {}
