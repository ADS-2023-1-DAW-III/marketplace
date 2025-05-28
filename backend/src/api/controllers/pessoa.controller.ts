import { Body, Controller, Get, Post, HttpCode } from '@nestjs/common';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import { Pessoa } from '../../modules/pessoa/pessoa.entity';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { CreatePessoaResponseDTO } from '../../modules/pessoa/dto/createPessoaResponse.dto';

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
  ): Promise<CreatePessoaResponseDTO> {
    const response: CreatePessoaResponseDTO =
      await this.pessoaService.create(request);

    return response;
  }
}
