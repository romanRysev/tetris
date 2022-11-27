import { themeModel } from '../models/themes'
import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { userModel } from '../models/user'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: "localhost",
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  dialect: 'postgres',
  port: Number(POSTGRES_PORT),
  ssl: false,  
  dialectOptions: {},
}

export const sequelize = new Sequelize(sequelizeOptions)

export const User = sequelize.define('User', userModel, {})

export const Theme = sequelize.define('Theme', themeModel, {})

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully')
  } catch (e) {
    console.error('Unable to connect to the database: ', e)
  }
}
