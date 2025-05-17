import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      const dataSource: DataSource = new DataSource({
        type: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'user',
        password: 'password',
        database: 'marketplace',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
      });

      await dataSource.initialize();

      return dataSource;
    },
  },
];
