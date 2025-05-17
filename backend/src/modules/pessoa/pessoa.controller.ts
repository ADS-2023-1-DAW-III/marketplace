import { Body, Controller, Get, Post } from '@nestjs/common';
import { PessoaService } from './pessoa.service';
import { Pessoa } from './pessoa.entity';
import { CreatePessoaRequestDTO } from './dto/createUserRequest.dto';
import { CreatePessoaResponseDTO } from './dto/createPessoaResponse.dto';

@Controller('pessoa')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll(): Promise<Pessoa[]> {
    return this.pessoaService.findAll();
  }

  @Post()
  async createPessoa(
    @Body() request: CreatePessoaRequestDTO,
  ): Promise<CreatePessoaResponseDTO> {
    const response: CreatePessoaResponseDTO =
      await this.pessoaService.create(request);

    return response;
  }
}
