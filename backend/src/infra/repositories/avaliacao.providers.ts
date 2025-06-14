import { DataSource } from 'typeorm';
import { Avaliacao } from '../../modules/avaliacao/avaliacao.entity';


export const AvaliacaoProviders = [
  {
    provide: 'AVALIACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Avaliacao),
    inject: ['DATA_SOURCE'],
  },
];
