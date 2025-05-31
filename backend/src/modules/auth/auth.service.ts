import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PessoaService } from '../pessoa/pessoa.service';
import { CreatePessoaRequestDTO } from '../pessoa/dto/createPessoaRequest.dto';
import { LoginRequestDTO } from './dto/authRequest.dto';
import { AuthResponseDTO } from './authResponse.dto';
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
    const pessoa = await this.pessoaService.findInternalPessoaByLogin(
      dto.login,
    );

    if (!pessoa) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const senhaValida = await bcrypt.compare(dto.senha, pessoa.senha);
    if (!senhaValida) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }

    const token = generateJWT({
      userId: pessoa.abacate_id,
      username: pessoa.username,
    });

    return {
      token,
      userId: pessoa.abacate_id,
    };
  }
}