import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { HistoricoService } from 'src/modules/historico/historico.service';
import { CreateHistoricoRequestDto } from 'src/modules/historico/dto/createHistoricoRequest.dto';
import { UpdateHistoricoRequestDto } from 'src/modules/historico/dto/updateHistoricoRequest.dto';
import { HistoricoResponseDto } from 'src/modules/historico/dto/createHistoricoResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('historico')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('historico')
export class HistoricoController {
  constructor(private readonly historicoService: HistoricoService) {}

  @ApiResponse({
    status: 201,
    description: 'Histórico criado com sucesso',
    type: HistoricoResponseDto,
  })
  @Post()
  async create(
    @Body() dto: CreateHistoricoRequestDto,
  ): Promise<HistoricoResponseDto> {
    return this.historicoService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todos os históricos',
    type: [HistoricoResponseDto],
  })
  @Get()
  async findAll(): Promise<HistoricoResponseDto[]> {
    return this.historicoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o histórico com o determinado id',
    type: HistoricoResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<HistoricoResponseDto> {
    return this.historicoService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza um pagamento pelo id',
    type: [UpdateHistoricoRequestDto],
  })
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: UpdateHistoricoRequestDto,
  ): Promise<HistoricoResponseDto> {
    return this.historicoService.update(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remoção do histórico com sucesso',
  })
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.historicoService.remove(id);
  }
}
