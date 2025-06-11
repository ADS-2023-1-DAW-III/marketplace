import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PessoaService } from '../pessoa/pessoa.service';
import { CreatePessoaRequestDTO } from '../pessoa/dto/createPessoaRequest.dto';
import { LoginRequestDTO } from './dto/authRequest.dto';
import { AuthResponseDTO } from './authResponse.dto';
// import { generateJWT } from '../../lib/auth/auth'; // Remova ou comente esta linha
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt'; // Importe o JwtService

@Injectable()
export class AuthService {
  constructor(
    private readonly pessoaService: PessoaService,
    private readonly jwtService: JwtService, // Injete o JwtService
  ) {}

  async signup(dto: CreatePessoaRequestDTO): Promise<AuthResponseDTO> {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);

    const pessoa = await this.pessoaService.create({
      ...dto,
      senha: hashedPassword,
    });

    // Use o jwtService para gerar o token
    const payload = {
      sub: pessoa.abacate_id,
      username: pessoa.username,
      email: pessoa.email,
    }; // Adapte o payload para o que sua estratégia espera
    const token = this.jwtService.sign(payload);

    return {
      token,
      userId: pessoa.abacate_id,
    };
  }

  async login(dto: LoginRequestDTO): Promise<AuthResponseDTO> {
    const pessoas = await this.pessoaService.findAll();
    let pessoa = pessoas.find((p) => p.email === dto.login);

    if (pessoa === undefined) {
      pessoa = pessoas.find((p) => p.username === dto.login);
    }

    if (!pessoa) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(dto.senha, pessoa.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    // Use o jwtService para gerar o token
    const payload = {
      sub: pessoa.abacate_id,
      username: pessoa.username,
      email: pessoa.email,
    }; // Adapte o payload para o que sua estratégia espera
    const token = this.jwtService.sign(payload);

    return {
      token,
      userId: pessoa.abacate_id,
    };
  }
}
