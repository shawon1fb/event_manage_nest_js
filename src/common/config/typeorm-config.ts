import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5433,
  username: 'root',
  password: 'secret',
  database: 'event_app',
  entities: [
    __dirname + '/../../**/*.entity.js',
    __dirname + '/../../**/*-entity.js',
  ],
  synchronize: true,
};
