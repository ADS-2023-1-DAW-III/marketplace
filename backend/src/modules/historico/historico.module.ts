import { Module } from '@nestjs/common';
import { HistoricoService } from './historico.service';
import { HistoricoController } from '../../api/controllers/historico.controller';
import { DatabaseModule } from 'src/infra/database.module';
import { HistoricoProviders } from 'src/infra/repositories/historico.providers';
import { PessoaProviders } from 'src/infra/repositories/pessoa.providers';
import { ServicoProviders } from 'src/infra/repositories/servico.providers';

@Module({
    imports: [DatabaseModule],
    controllers: [HistoricoController],
    providers: [...HistoricoProviders, ...PessoaProviders, ...ServicoProviders, HistoricoService],
    exports: [HistoricoService],
})
export class HistoricoModule {}