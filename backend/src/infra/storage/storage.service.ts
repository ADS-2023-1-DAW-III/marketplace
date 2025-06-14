import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { mkdirSync, existsSync, writeFileSync, readdirSync } from 'fs';
import { extname, join } from 'path';

@Injectable()
export class StorageService {
  private readonly basePath = join(__dirname, '../../uploads');

  saveProfileImage(username: string, file: Express.Multer.File): string {
    const userDir = join(this.basePath, username);
    if (!existsSync(userDir)) {
      mkdirSync(userDir, { recursive: true });
    }

    const filePath = join(userDir, `profile${extname(file.originalname)}`);
    try {
      writeFileSync(filePath, file.buffer);
      return `/uploads/${username}/${filePath}`;
    } catch {
      throw new InternalServerErrorException('Erro ao salvar a imagem');
    }
  }

  getProfileImage(username: string): string | undefined {
    const userDir = join(this.basePath, username);
    const files = readdirSync(userDir);
    const profileFile = files.find((file) => file.startsWith('profile'));
    return profileFile;
  }
}
