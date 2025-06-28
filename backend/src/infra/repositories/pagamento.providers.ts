import { DataSource } from 'typeorm';
import { Pagamento } from '../../modules/pagamento/pagamento.entity';

export const PagamentoProviders = [
  {
    provide: 'PAGAMENTO_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pagamento),
    inject: ['DATA_SOURCE'],
  },
];
