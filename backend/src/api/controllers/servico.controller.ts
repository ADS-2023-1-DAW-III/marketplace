import { Controller, Get, Post, Body, Param, Patch, Delete } from '@nestjs/common';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { UpdateServicoRequestDto } from '../../modules/servico/dto/updateServicoRequest.dto';
import { ServicoResponseDto } from '../../modules/servico/dto/createServicoResponse.dto';

@Controller('servico')
export class ServicoController {
    constructor(private readonly servicoService: ServicoService) {}

    @Post()
    async create(
        @Body() dto: CreateServicoRequestDto,
    ): Promise<ServicoResponseDto> {
        return this.servicoService.create(dto);
    }

    @Get()
    async findAll(): Promise<ServicoResponseDto[]> {
        return this.servicoService.findAll();
    }

    @Get(':id')
    async findOne(@Param('id') id: string): Promise<ServicoResponseDto> {
        return this.servicoService.findOne(id);
    }

    @Patch(':id')
    async update(
        @Param('id') id: string,
        @Body() dto: UpdateServicoRequestDto,
    ): Promise<ServicoResponseDto> {
        return this.servicoService.update(id, dto);
    }

    @Delete(':id')
    async remove(@Param('id') id: string): Promise<void> {
        return this.servicoService.remove(id);
    }
}