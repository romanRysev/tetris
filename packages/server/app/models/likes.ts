import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface ILike {
  authorID: number
  postID: number
  like: boolean
  dislike: boolean
}

export const likesModel: ModelAttributes<Model, ILike> = {
  authorID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  postID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  like: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  dislike: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
}
