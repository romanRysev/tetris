import { themeModel } from '../models/themes'
import type { SequelizeOptions } from 'sequelize-typescript'
import { Sequelize } from 'sequelize-typescript'
import { userModel } from '../models/user'
import { topicModel } from '../models/topic'
import { postModel } from '../models/post'
import { likesModel } from '../models/likes'

const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  host: 'localhost',
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

export const Topic = sequelize.define('Topic', topicModel, {})

export const Post = sequelize.define('Post', postModel, {})

export const Reaction = sequelize.define('Reaction', likesModel, {})

// отношения
User.hasMany(Topic, {
  foreignKey: 'authorID',
})
Topic.belongsTo(User, {
  foreignKey: 'authorID',
})

User.hasOne(Theme, {
  foreignKey: 'userID',
})
Theme.belongsTo(User, {
  foreignKey: 'userID',
})

Topic.hasMany(Post, {
  foreignKey: 'topicID',
})
Post.belongsTo(Topic, {
  foreignKey: 'topicID',
})

User.hasMany(Post, {
  foreignKey: 'authorID',
})
Post.belongsTo(User, {
  foreignKey: 'authorID',
})

User.hasMany(Reaction, {
  foreignKey: 'authorID',
})
Reaction.belongsTo(User, {
  foreignKey: 'authorID',
})

Post.hasMany(Reaction, {
  foreignKey: 'postID',
})
Reaction.belongsTo(Post, {
  foreignKey: 'postID',
})

export async function dbConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully')
  } catch (e) {
    console.error('Unable to connect to the database: ', e)
  }
}

export function startApp() {
  dbConnect().then()
}
