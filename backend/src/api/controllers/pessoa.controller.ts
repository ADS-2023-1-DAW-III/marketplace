import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  Param,
  Request,
  HttpStatus,
  Put,
  Delete,
} from '@nestjs/common';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { PessoaResponseDTO } from '../../modules/pessoa/dto/pessoaResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { DeleteResult } from 'typeorm';

@UseGuards(AuthGuard('jwt'))
@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @Get()
  async findAll(): Promise<PessoaResponseDTO[]> {
    return this.pessoaService.findAll();
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async createPessoa(
    @Body() request: CreatePessoaRequestDTO,
  ): Promise<PessoaResponseDTO> {
    const response: PessoaResponseDTO =
      await this.pessoaService.create(request);
    return response;
  }

  @Get('username/:username')
  @HttpCode(HttpStatus.OK)
  async findById(
    @Param('username') username: string,
  ): Promise<PessoaResponseDTO> {
    return this.pessoaService.findById(username);
  }

  @Get('email/:email')
  @HttpCode(HttpStatus.OK)
  async findByEmail(@Param('email') email: string): Promise<PessoaResponseDTO> {
    return this.findByEmail(email);
  }

  @Put(':username')
  @HttpCode(HttpStatus.OK)
  async updatePessoa(
    @Param('username') username: string,
    @Body() pessoa: Partial<CreatePessoaRequestDTO>,
  ): Promise<PessoaResponseDTO> {
    return this.pessoaService.update(username, pessoa);
  }

  @Delete(':username')
  @HttpCode(HttpStatus.OK)
  async deletePessoa(
    @Param('username') username: string,
  ): Promise<DeleteResult> {
    return this.pessoaService.delete(username);
  }

  @Get('profile')
  @HttpCode(HttpStatus.OK)
  async getProfile(@Request() req: any): Promise<PessoaResponseDTO> {
    return await this.pessoaService.findById(String(req.user.username));
  }
}
