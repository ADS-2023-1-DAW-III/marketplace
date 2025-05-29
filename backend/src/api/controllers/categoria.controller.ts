import { Controller, Post, Body, Get, Put, Param, Patch, Delete, UseGuards } from '@nestjs/common';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { CreateCategoriaDto } from '../../modules/categoria/dto/createCategoriaRequest.dto';
import { CreateCategoriaResponseDto } from '../../modules/categoria/dto/createCategoriaResponse.dto';
import { UpdateCategoriaRequestDto } from '../../modules/categoria/dto/updateCategoriaRequest.dto';
import { Categoria } from '../../modules/categoria/categoria.entity';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'))
@Controller('categorias')
export class CategoriaController {
    constructor(private readonly categoriaService: CategoriaService) {}

    @Post()
    async create(
        @Body() dto: CreateCategoriaDto,
    ): Promise<CreateCategoriaResponseDto> {
        return this.categoriaService.create(dto);
    }

    @Get()
    async findAll(): Promise<Categoria[]> {
        return this.categoriaService.findAll();
    }

    @Get(':nome')
    async findOne(
        @Param('nome') nome: string,
    ): Promise<CreateCategoriaResponseDto> {
        return this.categoriaService.findOne(nome);
    }

    @Patch(':nome')
    async update(
        @Param('nome') nome: string,
        @Body() dto: UpdateCategoriaRequestDto,
    ): Promise<CreateCategoriaResponseDto> {
        return this.categoriaService.update(nome, dto);
    }

    @Delete(':nome')
    async remove(@Param('nome') nome: string): Promise<void> {
        return this.categoriaService.remove(nome);
    }
}