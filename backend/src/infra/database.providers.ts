import { DataSource } from 'typeorm';

export const databaseProviders = [
  {
    provide: 'DATA_SOURCE',
    useFactory: async (): Promise<DataSource> => {
      const dataSource: DataSource = new DataSource({
        type: 'postgres',
        host: 'ep-tiny-bread-a5a31wdy-pooler.us-east-2.aws.neon.tech',
        port: 5432,
        username: 'neondb_owner',
        password: 'SENHA_AQUI',
        database: 'neondb',
        entities: [__dirname + '/../**/*.entity{.ts,.js}'],
        synchronize: true,
        ssl: {
          rejectUnauthorized: false,
        },
      });

      await dataSource.initialize();

      return dataSource;
    },
  },
];
