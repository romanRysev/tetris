import { Topic, User } from '../config/db.config'
import type { ITopic } from '../models/topic'

// Создание записи
export async function createTopic(props: ITopic) {
  return Topic.create({ ...props })
}

// Обновление записи по id
export async function updateTopicByID(id: number, lastReply: number) {
  return Topic.update( {lastReply}, { where: { id } })
}

// Удаление записи по ID
export async function deleteTopicById(id: number) {
  return Topic.destroy({ where: { id } })
}

// Получение записи по ID
export async function getTopicById(id: number) {
  return Topic.findOne({ where: { id } })
}

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
    ]
  })
}

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
