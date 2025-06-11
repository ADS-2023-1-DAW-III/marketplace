import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// Mantenha esta como uma constante se você não for usar variáveis de ambiente
// Ou garanta que process.env.JWT_SECRET esteja definido em seu ambiente de teste
const JWT_SECRET = process.env.JWT_SECRET || 'SENHA'; // Usar a mesma SECRET do AuthModule

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: JWT_SECRET, // Garanta que seja a mesma chave do JwtModule.register
    });
  }

  // O payload deve conter o que você colocou no jwtService.sign()
  validate(payload: { sub: string; username: string; email: string }) {
    // Você pode retornar o objeto completo do usuário aqui se quiser
    // Ou apenas as propriedades que você precisa no request.user
    return {
      userId: payload.sub,
      username: payload.username,
      email: payload.email,
    };
  }
}
