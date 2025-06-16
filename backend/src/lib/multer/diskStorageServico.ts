import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

export const storageImageServico = diskStorage({
  destination: (req: Request, _file, cb) => {
    try {
      if (!req.body?.id) {
        return cb(new Error('Serviço não encontrado'), '');
      }

      const id = req.body.id;

      const userUploadPath = `./uploads/servicos/${id}`;

      if (!existsSync(userUploadPath)) {
        mkdirSync(userUploadPath, { recursive: true, mode: 0o755 });
      }

      cb(null, userUploadPath);
    } catch (error) {
      cb(error instanceof Error ? error : new Error('Erro no servidor'), '');
    }
  },
  filename: (_req, file, cb) => {
    try {
      const extension = extname(file.originalname);
      cb(null, `serviceImage${extension}`);
    } catch (error) {
      cb(
        error instanceof Error ? error : new Error('Erro ao processar arquivo'),
        '',
      );
    }
  },
});
