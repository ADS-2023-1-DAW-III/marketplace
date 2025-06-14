import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  HttpCode,
} from '@nestjs/common';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { UpdateServicoRequestDto } from '../../modules/servico/dto/updateServicoRequest.dto';
import { ServicoResponseDto } from '../../modules/servico/dto/createServicoResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Servico } from 'src/modules/servico/servico.entity';
import { ServicoDetailedResponseDto } from 'src/modules/servico/dto/servicoDetailedResponse.dto';

@ApiTags('servico')
@UseGuards(AuthGuard('jwt'))
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) { }

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
  ): Promise<ServicoDetailedResponseDto> {
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
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesProvidedByUser(req.user.username);
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
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesContractedByUser(req.user.username);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todos os serviços',
    type: [Servico],
  })
  @Get()
  @HttpCode(200)
  async findAll(): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o serviço com o determinado id',
    type: ServicoResponseDto,
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findOne(id);
  }
}
