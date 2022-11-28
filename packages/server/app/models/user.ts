import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  userID: number
  firstName: string
  secondName: string
  displayName: string
  login: string
  email: string
  phone: string
  avatar: string
  role: 'admin' | 'user'
}

export const userModel: ModelAttributes<Model, IUser> = {
  userID: {
    type: DataType.INTEGER,
    allowNull: false,
    primaryKey: true,
  },
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataType.STRING,
  },
  displayName: {
    type: DataType.STRING,
    allowNull: true,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
  },
  email: {
    type: DataType.STRING,
    allowNull: false,
  },
  phone: {
    type: DataType.STRING,
    allowNull: false,
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  role: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'user',
  },
}
