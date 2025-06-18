import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  Request,
  HttpCode,
  Query,
} from '@nestjs/common';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { ServicoResponseDto } from '../../modules/servico/dto/createServicoResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Servico } from 'src/modules/servico/servico.entity';
import { ServicoDetailedResponseDto } from 'src/modules/servico/dto/servicoDetailedResponse.dto';

@ApiTags('servico')
@UseGuards(AuthGuard('jwt'))
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @ApiResponse({
    status: 201,
    description: 'Serviço criado com sucesso',
    type: ServicoResponseDto,
  })
  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateServicoRequestDto,
    @Request() req,
  ): Promise<ServicoResponseDto> {
    dto.id_prestador = req.user.username;
    return this.servicoService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista os serviços prestados pelo usuário autenticado',
    type: ServicoDetailedResponseDto,
  })
  @Get('prestados')
  @HttpCode(200)
  async findServicesProvided(
    @Request() req,
    @Query('query') query?: string,
    @Query('categoria') categoria?: string,
    @Query('valorMin') valorMin?: number,
    @Query('valorMax') valorMax?: number,
    @Query('avaliacao') avaliacao?: number,
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesProvidedByUser(
      req.user.username,
      query,
      categoria,
      valorMin,
      valorMax,
      avaliacao,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Lista os serviços contratados pelo usuário autenticado',
    type: ServicoDetailedResponseDto,
  })
  @Get('contratados')
  @HttpCode(200)
  async findServicesContracted(
    @Request() req,
    @Query('query') query?: string,
    @Query('categoria') categoria?: string,
    @Query('valorMin') valorMin?: number,
    @Query('valorMax') valorMax?: number,
    @Query('avaliacao') avaliacao?: number,
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesContractedByUser(
      req.user.username,
      query,
      categoria,
      valorMin,
      valorMax,
      avaliacao,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todos os serviços',
    type: [Servico],
  })
  @Get()
  @HttpCode(200)
  async findAll(
    @Query('query') query?: string,
    @Query('categoria') categoria?: string,
    @Query('valorMin') valorMin?: number,
    @Query('valorMax') valorMax?: number,
    @Query('avaliacao') avaliacao?: number,
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findAll(
      query,
      categoria,
      valorMin,
      valorMax,
      avaliacao,
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o serviço com o determinado id',
    type: ServicoResponseDto,
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza o status do serviço para EM ANDAMENTO',
    type: ServicoResponseDto,
  })
  @Put('/andamento/:id')
  @HttpCode(200)
  async toEmAndamento(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.toEmAndamento(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza o status do serviço para CONCLUIDO',
    type: ServicoResponseDto,
  })
  @Put('/concluido/:id')
  @HttpCode(200)
  async toConcluido(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.toConcluido(id);
  }
}
