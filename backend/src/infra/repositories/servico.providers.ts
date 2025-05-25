import { DataSource } from 'typeorm';
import { Servico } from '../../modules/servico/servico.entity';


export const ServicoProviders = [
  {
    provide: 'SERVICO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Servico),
    inject: ['DATA_SOURCE'],
  },
];
