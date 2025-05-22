import { CreatePessoaRequestDTO } from '../../modules/pessoa/dto/createPessoaRequest.dto';
import { CreatePessoaResponseDTO } from '../../modules/pessoa/dto/createPessoaResponse.dto';
import { AuthResponseDTO } from '../../modules/pessoa/dto/authResponse.dto';

export class AuthService {
  private JWT_SECRET = process.env.JWT_SECRET;

  async signup(dto: CreatePessoaRequestDTO): Promise<AuthResponseDTO> {

  }

  async login(dto: CreatePessoaRequestDTO): Promise<AuthResponseDTO> {

  }
}