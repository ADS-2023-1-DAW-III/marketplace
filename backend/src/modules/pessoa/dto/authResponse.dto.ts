export class AuthResponseDTO {
  token: string;

  constructor(token: string) {
    this.token = token;
  }
}