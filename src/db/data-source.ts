import 'reflect-metadata'
import { DataSource, DataSourceOptions, LoggerOptions } from 'typeorm'
import { SnakeNamingStrategy } from 'typeorm-naming-strategies'
import {
  DB_DATABASE,
  DB_HOST,
  DB_LOGGING,
  DB_PASSWORD,
  DB_PORT,
  DB_SYNC,
  DB_USER,
} from '../common/config'

const dbName = DB_DATABASE as string
const dbUser = DB_USER as string
const dbHost = DB_HOST
const dbPassword = DB_PASSWORD
const dbPort = Number(DB_PORT)
const dbSync = DB_SYNC
const dbLogging: LoggerOptions = DB_LOGGING as LoggerOptions

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: dbHost,
  port: dbPort,
  username: dbUser,
  password: dbPassword,
  database: dbName,
  synchronize: dbSync ? JSON.parse(dbSync.toLowerCase()) : false,
  logging: dbLogging,
  entities: [__dirname + '/../**/entities/*.entity.{js,ts}'],
  migrations: [__dirname + '/**/migrations/*.{js,ts}'],
  namingStrategy: new SnakeNamingStrategy(),
  migrationsTransactionMode: 'each',
}

const AppDataSource = new DataSource(dataSourceOptions)
AppDataSource.initialize()
export default AppDataSource
