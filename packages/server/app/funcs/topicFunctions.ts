import { Topic, User } from '../config/db.config'
import type { ITopic } from '../models/topic'

// Создание записи
export async function createTopic(props: ITopic) {
   return Topic.create({...props})
}

// Обновление записи по userID/id пользователя - здесь везде лучше userID
export async function updateTopicByUserID(userID: number, data: ITopic) {
  return Topic.update(data, { where: { userID } })
}

// Удаление записи по ID
export async function deleteTopicById(id: number) {
  return Topic.destroy({ where: { id } })
}

// Получение записи по ID
export async function getTopicById(id: number) {
  return Topic.findOne({ where: { id } })
}

// Поиск по параметрам
// export async function getTopicsByParams(
//   themeActive?: string,
//   userID?: number,
//   soundOn?: boolean,
//   musicOn?: boolean,
//   soundLevel?: string,
//   musicLevel?: string,
// ) {
//   return Topic.findAll({ where: { firstName } })
// }

// поиск по автору
export async function getTopicsByAuthor(userID: number) {
  const authorID = userID;
  return Topic.findAll({ 
    where: { authorID },
  include: [
    {
      model: User,
      attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
      required: false,
    }
] })
}

// поиск по ключевым словам
// export async function getTopicsByName(searchString: string) {
//   return Topic.findAll({ where: { userID } })
// }

// Удалить все записи
export async function deleteAllTopics() {
  return Topic.destroy({
    where: {},
    truncate: false
  })
}

// Получить все записи
export async function getAllTopics() {
  return Topic.findAll(
    {
      attributes: ['title'],
    include: [
      {
        model: User,
        attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
        required: false,
      }
  ]
  }
  )
}

// Получить все записи с возможностью пагинации
type groupTopic = {
  offset?: number
  limit?: number
}
export async function getTopicsWithCount(props: groupTopic) {
  const { offset, limit } = props;
  return Topic.findAndCountAll({
    // order: sequelize.literal('max(lastReply) DESC'),
    offset: offset || 0,
    limit: limit || 20,
    include: [
      {
        model: User,
        attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
      }
    ],
  })
}
