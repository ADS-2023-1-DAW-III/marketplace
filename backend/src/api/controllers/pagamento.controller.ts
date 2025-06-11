import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import { PagamentoService } from '../../modules/pagamento/pagamento.service';
import { CreatePagamentoDto } from '../../modules/pagamento/dto/createPagamentoRequest.dto';
import { UpdatePagamentoDto } from '../../modules/pagamento/dto/updatePagamentoRequest.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { PagamentoResponseDto } from 'src/modules/pagamento/dto/pagamentoResponse.dto';
import { Pagamento } from 'src/modules/pagamento/pagamento.entity';

@UseGuards(AuthGuard('jwt'))
@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) { }

  @ApiResponse({
    status: 201,
    description: 'Pagamento criada com sucesso',
    type: PagamentoResponseDto,
  })
  @Post()
  create(@Body() dto: CreatePagamentoDto) {
    return this.pagamentoService.create(dto);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todas os pagamentos',
    type: [Pagamento],
  })
  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o pagamento com o determinado id',
    type: PagamentoResponseDto,
  })
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza um pagamento pelo id',
    type: [PagamentoResponseDto],
  })
  @ApiBody({
    type: UpdatePagamentoDto,
  })
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePagamentoDto) {
    return this.pagamentoService.update(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remoção do pagamento com sucesso',
  })
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(id);
  }
}
