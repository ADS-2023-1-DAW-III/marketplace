import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/infra/database.module';
import { ServicoProviders } from 'src/infra/repositories/servico.providers';
import { ServicoService } from './servico.service';
import { ServicoController } from 'src/api/controllers/servico.controller';

@Module({
  imports: [DatabaseModule],
  providers: [...ServicoProviders, ServicoService],
  controllers: [ServicoController],
  exports: [ServicoService],
})
export class ServicoModule {}
