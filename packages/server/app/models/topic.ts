import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'
// import { formatNamedParameters } from 'sequelize/types/utils'

export interface ITopic {
  title: string
  authorID: number
  closed?: boolean
  lastReply?: number // индекс последнего ответа? оттуда можно дату и все остальное подтянуть
}

export const topicModel: ModelAttributes<Model, ITopic> = {
  title: {
    type: DataType.STRING,
    allowNull: false,
  },
  authorID: {
    type: DataType.INTEGER,
    allowNull: false,
  },
  closed: {
    type: DataType.BOOLEAN,
    allowNull: true,
    defaultValue: false,
  },
  lastReply: {
    type: DataType.INTEGER,
    allowNull: true,
  },
}
