import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { HistoricoService } from 'src/modules/historico/historico.service';
import { CreateHistoricoRequestDto } from 'src/modules/historico/dto/createHistoricoRequest.dto';
import { UpdateHistoricoRequestDto } from 'src/modules/historico/dto/updateHistoricoRequest.dto';
import { HistoricoResponseDto } from 'src/modules/historico/dto/createHistoricoResponse.dto';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('historico')
export class HistoricoController {
    constructor(private readonly historicoService: HistoricoService) {}

    @Post()
    async create(
        @Body() dto: CreateHistoricoRequestDto,
    ): Promise<HistoricoResponseDto> {
        return this.historicoService.create(dto);
    }

    @Get()
    async findAll(): Promise<HistoricoResponseDto[]> {
        return this.historicoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: number): Promise<HistoricoResponseDto> {
        return this.historicoService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: number,
        @Body() dto: UpdateHistoricoRequestDto,
    ): Promise<HistoricoResponseDto> {
        return this.historicoService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: number): Promise<void> {
        return this.historicoService.remove(id);
    }
}