import { Module } from '@nestjs/common';
import { PessoaModule } from './modules/pessoa/pessoa.module';
import { AbacateController } from './api/controllers/abacate.controller';
import { AbacateModule } from './infra/service/abacate.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [PessoaModule, AbacateModule, AuthModule],
  controllers: [AbacateController],
})
export class AppModule {}
