import { existsSync, mkdirSync, writeFileSync } from 'fs';
import { extname } from 'path';
import { InternalServerErrorException } from '@nestjs/common';

const generatedServiceFileName = (ext: string, complement: string) =>
  `serviceImage${complement}${ext}`;

export const saveServiceImages = (
  serviceId: string,
  files: Array<Express.Multer.File>,
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
    let complement = 1;
    files.map((file) => {
      const fileName = generatedServiceFileName(
        extname(file.originalname),
        complement.toString(),
      );
      const filePath = `${uploadPath}/${fileName}`;
      writeFileSync(filePath, file.buffer);
      complement += 1;
    });
    return uploadPath;
  } catch (error) {
    throw new InternalServerErrorException(
      'Não foi possível fazer o upload do arquivo: ' +
        (error instanceof Error ? error.message : 'Erro desconhecido'),
    );
  }
};
