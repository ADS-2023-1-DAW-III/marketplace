import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database.module';
import { ServicoProviders } from 'src/infra/repositories/servico.providers';
import { ServicoService } from './servico.service';
import { ServicoController } from 'src/api/controllers/servico.controller';
import { CategoriaModule } from '../categoria/categoria.module';
import { PessoaModule } from '../pessoa/pessoa.module';

@Module({
  imports: [DatabaseModule, CategoriaModule, PessoaModule],
  providers: [...ServicoProviders, ServicoService],
  controllers: [ServicoController],
  exports: [ServicoService],
})
export class ServicoModule {}
