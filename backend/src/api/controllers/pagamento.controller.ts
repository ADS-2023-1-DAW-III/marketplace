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

@UseGuards(AuthGuard('jwt'))
@Controller('pagamentos')
export class PagamentoController {
  constructor(private readonly pagamentoService: PagamentoService) {}

  @Post()
  create(@Body() dto: CreatePagamentoDto) {
    return this.pagamentoService.create(dto);
  }

  @Get()
  findAll() {
    return this.pagamentoService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pagamentoService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdatePagamentoDto) {
    return this.pagamentoService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pagamentoService.remove(id);
  }
}
