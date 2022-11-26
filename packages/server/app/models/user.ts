import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
  firstName: string
  lastName: string
  userID: number
}

export const userModel: ModelAttributes<Model, IUser> = {
  firstName: {
    type: DataType.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataType.STRING,
  },
  userID: {
    type: DataType.INTEGER,
    allowNull: false,
  }
}
