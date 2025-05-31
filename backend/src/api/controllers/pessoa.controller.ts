import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  NotFoundException,
  Param,
  Request,
} from '@nestjs/common';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import { Pessoa } from '../../modules/pessoa/pessoa.entity';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { PessoaResponseDTO } from '../../modules/pessoa/dto/pessoaResponse.dto';
import { AuthGuard } from '@nestjs/passport';

// Descomente a linha abaixo assim que terminar a issue
// @UseGuards(AuthGuard('jwt'))
@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll(): Promise<Pessoa[]> {
    return this.pessoaService.findAll();
  }

  @Post()
  @HttpCode(200)
  async createPessoa(
    @Body() request: CreatePessoaRequestDTO,
  ): Promise<PessoaResponseDTO> {
    const response: PessoaResponseDTO =
      await this.pessoaService.create(request);
    return response;
  }

  @Get('id/:username')
  @HttpCode(200)
  async findById(
    @Param('username') username: string,
  ): Promise<PessoaResponseDTO> {
    const response: PessoaResponseDTO | null =
      await this.pessoaService.findById(username);
    if (response != null) {
      return response;
    }

    throw new NotFoundException(
      `Pessoa não encontrado com o username: ${username}`,
    );
  }

  @Get('email/:email')
  @HttpCode(200)
  async findByEmail(@Param('email') email: string): Promise<PessoaResponseDTO> {
    const pessoa = await this.pessoaService.findByEmail(email);

    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o email: ${email}`,
      );
    }

    return new PessoaResponseDTO(pessoa);
  }

  @Get(':username')
  @HttpCode(200)
  async findByUsername(@Param('username') username: string): Promise<PessoaResponseDTO> {
    const pessoa = await this.pessoaService.findByUsername(username);

    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o username: ${username}`,
      );
    }
    return new PessoaResponseDTO(pessoa);
  }

  @Get(':profile')
  async getProfile(@Request() req: any): Promise<PessoaResponseDTO> {
    const user = req.user; 
    const pessoa = await this.pessoaService.findById(user.username);
    if (!pessoa) {
      throw new NotFoundException(
        `Pessoa não encontrada com o username: ${user.username}`,
      );
    }
    return new PessoaResponseDTO(pessoa);
  }

}
