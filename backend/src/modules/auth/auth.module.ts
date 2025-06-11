import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from '../../api/auth/auth.controller';
import { AuthService } from './auth.service';
import { PessoaModule } from '../pessoa/pessoa.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    PessoaModule,
    PassportModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'SENHA', // Use a variável de ambiente ou a mesma chave literal
      signOptions: { expiresIn: '1h' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
})
export class AuthModule {}
