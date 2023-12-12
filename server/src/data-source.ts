import 'reflect-metadata'
import { DataSource } from 'typeorm'
import { JobPosition } from './entity/JobPosition'

export const AppDataSource = new DataSource({
  type: 'sqlite',
  database: './index.sqlite',
  synchronize: true,
  logging: false,
  entities: [ JobPosition ],
  migrations: [],
  subscribers: [],
})
