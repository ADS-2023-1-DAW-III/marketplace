import { DataSource } from 'typeorm';
import { Categoria } from '../../modules/categoria/categoria.entity';


export const CategoriaProviders = [
  {
    provide: 'CATEGORIA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Categoria),
    inject: ['DATA_SOURCE'],
  },
];
