import { Body, Controller, Post, HttpCode } from '@nestjs/common';
import { AuthService } from '../../modules/auth/auth.service';
import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { LoginRequestDTO } from 'src/modules/auth/dto/authRequest.dto';
import { AuthResponseDTO } from '../../modules/auth/authResponse.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @HttpCode(201)
  async signup(
    @Body() request: CreatePessoaRequestDTO,
  ): Promise<AuthResponseDTO> {
    return this.authService.signup(request);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() request: LoginRequestDTO): Promise<AuthResponseDTO> {
    return this.authService.login(request);
  }
}
