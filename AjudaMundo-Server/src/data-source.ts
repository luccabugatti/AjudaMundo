import 'dotenv/config'
import { DataSource } from 'typeorm'

import {
  UserEntity,
  OngEntity,
  ActivityStatusEntity,
  ActivityEntity,
} from './entities'

const DB_HOST = process.env.DB_HOST || 'localhost'
const DB_PORT = Number(process.env.DB_PORT) || 5432
const DB_PASSWORD = process.env.DB_PASSWORD || 'root'
const DB_USER = process.env.DB_USER || 'root'
const DB_SCHEMA = process.env.DB_SCHEMA || 'appdb'
const ENVIROMENT = process.env.NODE_ENV || 'development'

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: DB_PORT,
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_SCHEMA,
  synchronize: true, // caso isso vá para produção deve ser setado como false, OBRIGATORIAMENTE!
  logging: ENVIROMENT === 'development' ? true : false,
  entities: [UserEntity, OngEntity, ActivityStatusEntity, ActivityEntity],
  subscribers: [],
  migrations: ['src/db/migrations/**/*'],
})
export const InitializeDatabase = async (): Promise<void> => {
  try {
    await AppDataSource.initialize()
  } catch (error) {
    throw error
  }
}
