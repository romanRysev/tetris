import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ITheme {
  themeActive: string
  userID: number
  soundOn: boolean
  musicOn: boolean
  soundLevel: string
  musicLevel: string
}

export interface IThemeUpdate {
  themeActive?: string
  userID?: number
  soundOn?: boolean
  musicOn?: boolean
  soundLevel?: string
  musicLevel?: string
}

export const themeModel: ModelAttributes<Model, ITheme> = {
  themeActive: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      isIn: [
        [ 'classic', 'shark', 'dark', 'newYear']
      ]
    },
  },
  userID: {
    type: DataType.INTEGER,
    allowNull: false,
    validate: {
      isDecimal: true,
    },
  },

  soundOn: {
    type: DataType.BOOLEAN,
  },
  musicOn: {
    type: DataType.BOOLEAN,
  },
  soundLevel: {
    type: DataType.STRING,
  },
  musicLevel: {
    type: DataType.STRING,
  },
}
