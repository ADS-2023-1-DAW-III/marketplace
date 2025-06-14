import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { AvaliacaoService } from 'src/modules/avaliacao/avaliacao.service';
import { AvaliacaoRequestDTO } from 'src/modules/avaliacao/dto/AvaliacaoRequest.dto';
import { AvaliacaoResponseDTO } from 'src/modules/avaliacao/dto/AvaliacaoResponse.dto';
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
  async findAll(): Promise<AvaliacaoResponseDTO[]> {
    return this.avaliacaoService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<AvaliacaoResponseDTO> {
    return this.avaliacaoService.findOne(id);
  }

  @Put(':id')
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
