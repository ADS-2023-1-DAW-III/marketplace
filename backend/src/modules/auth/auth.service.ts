import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PessoaService } from '../pessoa/pessoa.service';
import { CreatePessoaRequestDTO } from '../pessoa/dto/createPessoaRequest.dto';
import { LoginRequestDTO } from '../pessoa/dto/authRequest.dto';
import { AuthResponseDTO } from '../pessoa/dto/authResponse.dto';
import { generateJWT } from '../../lib/auth/auth';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private readonly pessoaService: PessoaService) {}

  async signup(dto: CreatePessoaRequestDTO): Promise<AuthResponseDTO> {
    const hashedPassword = await bcrypt.hash(dto.senha, 10);

    const pessoa = await this.pessoaService.create({
      ...dto,
      senha: hashedPassword,
    });

    const token = generateJWT({ userId: pessoa.abacate_id });

    return {
      token,
      userId: pessoa.abacate_id,
    };
  }

  async login(dto: LoginRequestDTO): Promise<AuthResponseDTO> {
    const pessoas = await this.pessoaService.findAll();
    let pessoa = pessoas.find(p => p.email === dto.login);

    if (pessoa === undefined) {
      pessoa = pessoas.find(p => p.username === dto.login);
    }

    if (!pessoa) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(dto.senha, pessoa.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const token = generateJWT({ userId: pessoa.abacate_id });

    return {
      token,
      userId: pessoa.abacate_id,
    };
  }
}