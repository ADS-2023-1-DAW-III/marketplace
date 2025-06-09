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

@UseGuards(AuthGuard('jwt'))
@Controller('negociacoes')
export class NegociacaoController {
  constructor(private readonly negociacaoService: NegociacaoService) {}

  @Post()
  create(@Body() dto: CreateNegociacaoDto) {
    return this.negociacaoService.create(dto);
  }

  @Get()
  findAll() {
    return this.negociacaoService.findAll();
  }

  @Get('contratante/:id_pessoa')
  findAllByContractor(
    @Param('id_pessoa') idPessoa: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.negociacaoService.findAllByContractor(idPessoa, query);
  }

  @Get('prestador/:id_prestador')
  findAllByProvider(
    @Param('id_prestador') idPrestador: string,
    @Query() query: PaginationQueryDto,
  ) {
    return this.negociacaoService.findAllByProvider(idPrestador, query);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.negociacaoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: updateNegociacaoRequestDto) {
    return this.negociacaoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.negociacaoService.remove(id);
  }

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
