import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { InternalServerErrorException } from '@nestjs/common';

const generatedServiceFileName = (ext: string) => `serviceImage${ext}`;

export const saveServiceImage = (
  serviceId: string,
  file: Express.Multer.File,
): string => {
  try {
    if (!serviceId) {
      throw new InternalServerErrorException(
        'ID do serviço é obrigatório para salvar a imagem.',
      );
    }
    const uploadPath = `./uploads/servicos/${serviceId}`;
    if (!existsSync(uploadPath)) {
      mkdirSync(uploadPath, { recursive: true, mode: 0o755 });
    }
    const fileName = generatedServiceFileName(extname(file.originalname));
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
