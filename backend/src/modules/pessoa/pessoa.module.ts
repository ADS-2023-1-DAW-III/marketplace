import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { PessoaProviders } from './repository/pessoa.providers';
import { PessoaService } from './pessoa.service';
import { PessoaController } from './pessoa.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...PessoaProviders, PessoaService],
  controllers: [PessoaController],
})
export class PessoaModule {}
