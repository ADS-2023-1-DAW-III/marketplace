import { existsSync, mkdirSync } from 'fs';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { Request } from 'express';

export const storageImageProfile = diskStorage({
  destination: (req: Request, _file, cb) => {
    try {
      if (!req.body?.username) {
        return cb(
          new Error('Username é obrigatório no corpo da requisição'),
          '',
        );
      }

      const username = req.body.username;

      const userUploadPath = `./uploads/pessoas/${username}`;

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
      cb(null, `profileImage${extension}`);
    } catch (error) {
      cb(
        error instanceof Error ? error : new Error('Erro ao processar arquivo'),
        '',
      );
    }
  },
});
