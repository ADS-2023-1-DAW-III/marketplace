import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriaService } from '../../modules/categoria/categoria.service';
import { CreateCategoriaDto } from '../../modules/categoria/dto/createCategoriaRequest.dto';
import { CreateCategoriaResponseDto } from '../../modules/categoria/dto/createCategoriaResponse.dto';
import { UpdateCategoriaRequestDto } from '../../modules/categoria/dto/updateCategoriaRequest.dto';
import { Categoria } from '../../modules/categoria/categoria.entity';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('categoria')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('categorias')
export class CategoriaController {
  constructor(private readonly categoriaService: CategoriaService) {}

  @ApiResponse({
    status: 201,
    description: 'Categoria criada com sucesso',
    type: CreateCategoriaResponseDto,
  })
  @Post()
  async create(
    @Body() dto: CreateCategoriaDto,
  ): Promise<CreateCategoriaResponseDto> {
    return this.categoriaService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todas as categorias',
    type: [Categoria],
  })
  @Get()
  async findAll(): Promise<Categoria[]> {
    return this.categoriaService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna a categoria com o determinado nome',
    type: CreateCategoriaResponseDto,
  })
  @Get(':nome')
  async findOne(
    @Param('nome') nome: string,
  ): Promise<CreateCategoriaResponseDto> {
    return this.categoriaService.findOne(nome);
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna a categoria que foi atualizada',
    type: CreateCategoriaResponseDto,
  })
  @Patch(':nome')
  async update(
    @Param('nome') nome: string,
    @Body() dto: UpdateCategoriaRequestDto,
  ): Promise<CreateCategoriaResponseDto> {
    return this.categoriaService.update(nome, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remoção da categoria com sucesso',
  })
  @Delete(':nome')
  async remove(@Param('nome') nome: string): Promise<void> {
    return this.categoriaService.remove(nome);
  }
}
