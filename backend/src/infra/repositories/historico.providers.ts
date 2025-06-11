import { DataSource } from 'typeorm';
import { Historico } from 'src/modules/historico/historico.entity';

export const HistoricoProviders = [
  {
    provide: 'HISTORICO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Historico),
    inject: ['DATA_SOURCE'],
  },
];
