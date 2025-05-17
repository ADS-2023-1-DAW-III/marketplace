import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PessoaModule } from './modules/pessoa/pessoa.module';

@Module({
  imports: [PessoaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
