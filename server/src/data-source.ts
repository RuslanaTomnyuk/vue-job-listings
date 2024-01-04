import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { JobPosition } from './entity/JobPosition';
import { Role } from './entity/Role';
import { User } from './entity/User';
import { UserToken } from './entity/UserToken';

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './index.sqlite',
  synchronize: true,
  logging: false,
  entities: [ JobPosition, Role, User, UserToken ],
  migrations: [],
  subscribers: [],
});
