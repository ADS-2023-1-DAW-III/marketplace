import { Module } from '@nestjs/common';
import { AuthController } from '../../api/auth/auth.controller';
import { AuthService } from './auth.service';
import { PessoaModule } from '../pessoa/pessoa.module';

@Module({
  imports: [PessoaModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}