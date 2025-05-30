import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { NegociacaoService } from '../../modules/negociacao/negociacao.service';
import { CreateNegociacaoDto } from '../../modules/negociacao/dto/createNegociacaoRequest.dto';
import { updateNegociacaoRequestDto } from '../../modules/negociacao/dto/updateNegociacaoRequest.dto';
import { AuthGuard } from '@nestjs/passport';

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
}
