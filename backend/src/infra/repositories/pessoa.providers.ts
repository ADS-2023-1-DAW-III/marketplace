import { DataSource } from 'typeorm';
import { Pessoa } from '../../modules/pessoa/pessoa.entity';

/**
 * PessoaProviders registra o repositório da entidade Pessoa como um provider
 * no sistema de injeção de dependência do NestJS.
 *
 * Isso permite que o Repository<Pessoa> seja injetado em serviços usando o token 'PESSOA_REPOSITORY'.
 *
 * Embora o repositório pertença ao TypeORM, ele é fornecido ao NestJS como um provider customizado.
 */
export const PessoaProviders = [
  {
    provide: 'PESSOA_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Pessoa),
    inject: ['DATA_SOURCE'],
  },
];
