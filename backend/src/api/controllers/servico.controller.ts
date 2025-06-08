import { Controller, Get, Post, Body, Param, Request, UseGuards, HttpCode } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { ServicoDetailedResponseDto } from 'src/modules/servico/dto/servicoDetailedResponse.dto';

@UseGuards(AuthGuard('jwt'))
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @Post()
  @HttpCode(201)
  async create(
    @Body() dto: CreateServicoRequestDto,
    @Request() req,
  ): Promise<ServicoDetailedResponseDto> {
    dto.id_prestador = req.user.username;
    return this.servicoService.create(dto);
  }

  @Get('prestados')
  @HttpCode(200)
  async findServicesProvided(@Request() req): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesProvidedByUser(req.user.username);
  }

  @Get('contratados')
  @HttpCode(200)
  async findServicesContracted(@Request() req): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesContractedByUser(req.user.username);
  }

  @Get()
  @HttpCode(200)
  async findAll(): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findAll();
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findOne(id);
  }
}