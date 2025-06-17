import {
  Body,
  Controller,
  Post,
  HttpCode,
  UseInterceptors,
  UploadedFile,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { LoginRequestDTO } from 'src/modules/auth/dto/authRequest.dto';
import { AuthResponseDTO } from '../../modules/auth/authResponse.dto';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiResponse({
    status: 201,
    description: 'Usuário criado com sucesso',
    type: AuthResponseDTO,
  })
  @ApiBody({
    type: CreatePessoaRequestDTO,
  })
  @Post('signup')
  @UseInterceptors(FileInterceptor('file'))
  @HttpCode(201)
  async signup(
    @Body() request: CreatePessoaRequestDTO,
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
  ): Promise<AuthResponseDTO> {
    return this.authService.signup(request, file);
  }

  @ApiResponse({
    status: 200,
    description: 'Acesso do usuário feito com sucesso',
    type: AuthResponseDTO,
  })
  @ApiBody({
    type: LoginRequestDTO,
  })
  @Post('login')
  @HttpCode(200)
  async login(@Body() request: LoginRequestDTO): Promise<AuthResponseDTO> {
    return this.authService.login(request);
  }
}
