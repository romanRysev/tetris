import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ITheme {
  themeActive: string
  userID: number
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  themeActive: {
    type: DataType.STRING,
    allowNull: false,
  },
  userID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
}
