import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  UseInterceptors,
  ParseFilePipeBuilder,
  UploadedFile,
} from '@nestjs/common';
import { ServicoService } from '../../modules/servico/servico.service';
import { CreateServicoRequestDto } from '../../modules/servico/dto/createServicoRequest.dto';
import { UpdateServicoRequestDto } from '../../modules/servico/dto/updateServicoRequest.dto';
import { ServicoResponseDto } from '../../modules/servico/dto/createServicoResponse.dto';
import { AuthGuard } from '@nestjs/passport';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Servico } from 'src/modules/servico/servico.entity';
import { FileInterceptor } from '@nestjs/platform-express';

@ApiTags('servico')
@UseGuards(AuthGuard('jwt'))
@Controller('servico')
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
    description: 'Lista todas os serviços',
    type: [Servico],
  })
  @Get()
  async findAll(): Promise<ServicoResponseDto[]> {
    return this.servicoService.findAll();
  }

  @ApiResponse({
    status: 200,
    description: 'Retorna o serviço com o determinado id',
    type: ServicoResponseDto,
  })
  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ServicoResponseDto> {
    return this.servicoService.findOne(id);
  }

  @ApiResponse({
    status: 200,
    description: 'Atualiza um serviço pelo id',
    type: [ServicoResponseDto],
  })
  @ApiBody({
    type: UpdateServicoRequestDto,
  })
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateServicoRequestDto,
  ): Promise<ServicoResponseDto> {
    return this.servicoService.update(id, dto);
  }

  @ApiResponse({
    status: 204,
    description: 'Remoção do serviço com sucesso',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return this.servicoService.remove(id);
  }
}
