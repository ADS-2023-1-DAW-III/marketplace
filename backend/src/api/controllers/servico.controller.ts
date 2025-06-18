import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  UseGuards,
  UseInterceptors,
  ParseFilePipeBuilder,
  UploadedFile,
  Request,
  HttpCode,
  Put,
} from '@nestjs/common';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { ServicoResponseDto } from '../../modules/servico/dto/createServicoResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Servico } from 'src/modules/servico/servico.entity';
import { ServicoDetailedResponseDto } from 'src/modules/servico/dto/servicoDetailedResponse.dto';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('servico')
@UseGuards(AuthGuard('jwt'))
@Controller('servicos')
export class ServicoController {
  constructor(private readonly servicoService: ServicoService) {}

  @ApiResponse({
    status: 201,
    description: 'Serviço criado com sucesso',
    type: ServicoResponseDto,
  })
  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body() dto: CreateServicoRequestDto,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: new RegExp('^(image\\/jpeg|image\\/png|image\\/jpg)$'),
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ): Promise<ServicoResponseDto> {
    return this.servicoService.create(dto, file);
  }

  @ApiResponse({
    status: 200,
    description: 'Lista os serviços prestados pelo usuário autenticado',
    type: ServicoDetailedResponseDto,
  })
  @Get('prestados')
  @HttpCode(200)
  async findServicesProvided(
    @Request() req,
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesProvidedByUser(
      String(req.user.username),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Lista os serviços contratados pelo usuário autenticado',
    type: ServicoDetailedResponseDto,
  })
  @Get('contratados')
  @HttpCode(200)
  async findServicesContracted(
    @Request() req,
  ): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findServicesContractedByUser(
      String(req.user.username),
    );
  }

  @ApiResponse({
    status: 200,
    description: 'Lista todos os serviços',
    type: [Servico],
  })
  @Get()
  @HttpCode(200)
  async findAll(): Promise<ServicoDetailedResponseDto> {
    return this.servicoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o serviço com o determinado id',
    type: ServicoResponseDto,
  })
  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.findById(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza o status do serviço para EM ANDAMENTO',
    type: ServicoResponseDto,
  })
  @Put('/andamento/:id')
  @HttpCode(200)
  async toEmAndamento(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.toEmAndamento(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza o status do serviço para CONCLUIDO',
    type: ServicoResponseDto,
  })
  @Put('/concluido/:id')
  @HttpCode(200)
  async toConcluido(@Param('id') id: string): Promise<Servico> {
    return this.servicoService.toConcluido(id);
  }
}
