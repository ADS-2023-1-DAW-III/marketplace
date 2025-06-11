import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  Req,
  UseGuards,
  HttpCode,
  HttpStatus,
  UnauthorizedException,
  Query,
} from '@nestjs/common';
import { NegociacaoService } from '../../modules/negociacao/negociacao.service';
import { CreateNegociacaoDto } from '../../modules/negociacao/dto/createNegociacaoRequest.dto';
import { updateNegociacaoRequestDto } from '../../modules/negociacao/dto/updateNegociacaoRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';
import { ApiBearerAuth, ApiBody, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { CreateNegociacaoResponseDto } from 'src/modules/negociacao/dto/createNegociacaoResponse.dto';
import { UpdateCategoriaRequestDto } from 'src/modules/categoria/dto/updateCategoriaRequest.dto';

@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('negociacoes')
export class NegociacaoController {
  constructor(private readonly negociacaoService: NegociacaoService) {}

  @ApiResponse({
    status: 201,
    description: 'Negociação criada com sucesso',
    type: CreateNegociacaoResponseDto,
  })
  @Post()
  create(@Body() dto: CreateNegociacaoDto) {
    return this.negociacaoService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todas as negociações',
    type: [CreateNegociacaoResponseDto],
  })
  @Get()
  findAll() {
    return this.negociacaoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Lista as negociações pelo id do contratante',
    type: [CreateNegociacaoResponseDto],
  })
  @ApiQuery({
    type: PaginationQueryDto,
  })
  @Get('contratante/:id_pessoa')
  findAllByContractor(
    @Param('id_pessoa') idPessoa: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.negociacaoService.findAllByContractor(idPessoa, query);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista as negociações pelo id do prestador',
    type: [CreateNegociacaoResponseDto],
  })
  @ApiQuery({
    type: PaginationQueryDto,
  })
  @Get('prestador/:id_prestador')
  findAllByProvider(
    @Param('id_prestador') idPrestador: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.negociacaoService.findAllByProvider(idPrestador, query);
  }

  @ApiResponse({
    status: 200,
    description: 'Busca uma negociação pelo id',
    type: [CreateNegociacaoResponseDto],
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negociacaoService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza uma negociação pelo id',
    type: [CreateNegociacaoResponseDto],
  })
  @ApiBody({
    type: UpdateCategoriaRequestDto,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: updateNegociacaoRequestDto) {
    return this.negociacaoService.update(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Atualiza uma negociação pelo id',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.negociacaoService.remove(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna a negociação aceita',
  })
  @Put(':id/accept')
  @HttpCode(HttpStatus.OK)
  acceptNegotiation(@Param('id') id: string, @Req() req: any) {
    const userId = req.user?.username;
    if (!userId) {
      throw new UnauthorizedException('Usuário não autenticado');
    }
    return this.negociacaoService.acceptNegotiation(id, userId);
  }
}
