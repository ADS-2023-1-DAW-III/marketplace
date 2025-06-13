import { Controller, Post, Body, Get, Put, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { AvaliacaoService } from '../../modules/avaliacao/avaliacao.service';
import { AvaliacaoRequestDTO } from '../../modules/avaliacao/dto/AvaliacaoRequest.dto';
import { AvaliacaoResponseDTO } from '../../modules/avaliacao/dto/AvaliacaoResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('avaliacoes')
export class AvaliacaoController {
  constructor(private readonly avaliacaoService: AvaliacaoService) {}

  @Post()
  async create(
    @Body() dto: AvaliacaoRequestDTO,
  ): Promise<AvaliacaoResponseDTO> {
    return this.avaliacaoService.create(dto);
  }

  @Get()
  async findAll(): Promise<AvaliacaoRequestDTO[]> {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AvaliacaoResponseDTO> {
    return this.avaliacaoService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: AvaliacaoRequestDTO,
  ): Promise<AvaliacaoResponseDTO> {
    return this.avaliacaoService.update(id, dto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.avaliacaoService.remove(id);
  }
}
