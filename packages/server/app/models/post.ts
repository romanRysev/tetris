import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IPost {
  authorID: number
  topicID: number
  message: string
  hide?: boolean
  firstLevel?: boolean
  parentID?: number
}

export const postModel: ModelAttributes<Model, IPost> = {
  message: {
    type: DataType.STRING,
    allowNull: false,
  },
  authorID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  topicID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  parentID: {
    type: DataType.INTEGER,
    allowNull: true,
  },
  hide: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  firstLevel: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: true,
  },
}
