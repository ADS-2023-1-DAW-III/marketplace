import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { InternalServerErrorException } from '@nestjs/common';

export const savePersonImage = (
  username: string,
  file: Express.Multer.File,
): string => {
  try {
    if (!username) {
      throw new InternalServerErrorException(
        'É nessecario o username da Pessoa para fazer o Upload da imagem',
      );
    }
    const uploadPath = `./uploads/pessoas/${username}`;
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true, mode: 0o755 });
    }
    const fileName = generatedPersonFileName(extname(file.originalname));
    const filePath = `${uploadPath}/${fileName}`;
    writeFileSync(filePath, file.buffer);
    return filePath;
  } catch (error) {
    throw new InternalServerErrorException(
      'Não foi possível fazer o upload do arquivo: ' +
        (error instanceof Error ? error.message : 'Erro desconhecido'),
    );
  }
};

export const generatedPersonFileName = (ext: string) => `profileImage${ext}`;
