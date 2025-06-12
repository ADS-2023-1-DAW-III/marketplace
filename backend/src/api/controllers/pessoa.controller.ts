import {
  Body,
  Controller,
  Get,
  Post,
  HttpCode,
  UseGuards,
  HttpStatus,
  Param,
  BadRequestException,
  Query,
  Put,
  Delete,
  Request,
} from '@nestjs/common';
import { PessoaService } from '../../modules/pessoa/pessoa.service';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { PessoaResponseDTO } from '../../modules/pessoa/dto/pessoaResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';
import { DeleteResult } from 'typeorm';

@ApiTags('pessoa')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('pessoas')
export class PessoaController {
  constructor(private readonly pessoaService: PessoaService) {}

  @ApiResponse({
    status: 200,
    description: 'Lista todas as Pessoas',
    type: [PessoaResponseDTO],
  })
  @Get()
  async findAll(): Promise<PessoaResponseDTO[]> {
    return this.pessoaService.findAll();
  }

  @ApiResponse({
    status: 201,
    description: 'Pessoa criada com sucesso',
    type: PessoaResponseDTO,
  })
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

  @Get('filter')
  async findbyIdOrEmail(
    @Query('username') username: string,
    @Query('email') email: string,
  ) {
    if (username == undefined && email == undefined) {
      throw new BadRequestException(
        'É necessário username ou email para fazer o filtro',
      );
    }
    return this.pessoaService.findByUsernameOrEmail(username, email);
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
