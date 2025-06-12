import { Module } from '@nestjs/common';
import { CategoriaService } from './categoria.service';
import { CategoriaController } from '../../api/controllers/categoria.controller';
import { DatabaseModule } from 'src/infra/database.module';
import { CategoriaProviders } from 'src/infra/repositories/categoria.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [CategoriaController],
  providers: [...CategoriaProviders, CategoriaService],
  exports: [CategoriaService],
})
export class CategoriaModule {}
