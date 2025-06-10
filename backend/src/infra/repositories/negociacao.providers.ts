import { DataSource } from 'typeorm';
import { Negociacao } from '../../modules/negociacao/negociacao.entity';

export const NegociacaoProviders = [
  {
    provide: 'NEGOCIACAO_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Negociacao),
    inject: ['DATA_SOURCE'],
  },
];
