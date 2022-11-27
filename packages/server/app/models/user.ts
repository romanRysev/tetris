import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  firstName: string
  secondName: string
  userID: number
  displayName: string
  login: string
  email: string
  phone: string
  avatar: string
  role: 'admin' | 'user'
}

export const userModel: ModelAttributes<Model, IUser> = {
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  secondName: {
    type: DataType.STRING,
  },
  userID: {
    type: DataType.INTEGER,
    allowNull: false,
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
  }
}
