import { DataType, Model } from 'sequelize-typescript'
import type { ModelAttributes } from 'sequelize/types'

export interface IUser {
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
  firstName: {
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
    }
  },
  secondName: {
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[A-ZА-ЯЁ][а-яА-ЯёЁa-zA-Z-]+$/,
    }
  },
  displayName: {
    type: DataType.STRING,
    allowNull: true,
  },
  login: {
    type: DataType.STRING,
    allowNull: false,
    validate: {
      is: /^[0-9a-zA-Z\-_]{3,20}/,
    }
  },
  email: {
    type: DataType.STRING,
    allowNull: true,
    validate: {
      isEmail: true,
    }
  },
  phone: {
    type: DataType.STRING,
    allowNull: true,
    validate: {
      is: /^[+]*[(]{0,1}[0-9]{1,3}[)]{0,1}[-\s./0-9]*$/,
    }
  },
  avatar: {
    type: DataType.STRING,
    allowNull: true,
  },
  role: {
    type: DataType.STRING,
    allowNull: true,
    defaultValue: 'user',
    validate: {
      isIn: [
        ['user', 'admin']
      ]
    }
  },
}
