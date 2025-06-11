import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../infra/database.module';
import { PessoaProviders } from '../../infra/repositories/pessoa.providers';
import { PessoaService } from './pessoa.service';
import { PessoaController } from '../../api/controllers/pessoa.controller';
import { AbacatePayModule } from '../abacate-pay/abacate-pay.module';

/**
 * O módulo Pessoa agrupa os componentes relacionados à entidade Pessoa:
 * - Controller para lidar com as requisições HTTP;
 * - Service contendo a lógica de negócio;
 * - Providers, como o repositório da entidade Pessoa.
 *
 * No NestJS, os módulos organizam a aplicação de forma modular e reutilizável,
 * encapsulando funcionalidades específicas de um domínio.
 */
@Module({
  imports: [DatabaseModule, AbacatePayModule],
  providers: [...PessoaProviders, PessoaService],
  controllers: [PessoaController],
  exports: [PessoaService],
})
export class PessoaModule {}
