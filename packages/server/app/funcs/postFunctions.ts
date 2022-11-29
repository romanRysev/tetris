import type { IPost } from '../models/post'
import { Post, Reaction, User } from '../config/db.config'

// Создание записи
export async function createPost(props: IPost) {
  return Post.create({ ...props })
}

// Обновление записи по userID/id пользователя - здесь везде лучше userID
export async function updatePostByID(id: number, data: IPost) {
  return Post.update(data, { where: { id } })
}

// Удаление записи по ID
export async function deletePostById(id: number) {
  return Post.destroy({ where: { id } })
}

// Получение записи по ID
export async function getPostById(id: number) {
  return Post.findOne({ where: { id } })
}

// Cкрытие записи
export async function hidePostById(id: number) {
  return Post.update({ hide: true }, { where: { id } })
}

// поиск по автору
export async function getPostsByAuthor(userID: number, topicID?: number) {
  const authorID = userID
  return Post.findAll({
    where: { authorID, topicID },
    include: [
      {
        model: User,
        attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
        required: false,
      },
    ],
  })
}

// Удалить все записи
export async function deleteAllPosts() {
  return Post.destroy({
    where: {},
    truncate: false,
  })
}

// Получить все записи
export async function getAllPosts() {
  return Post.findAll()
}

// Получить все записи темы с возможностью пагинации
type groupPost = {
  offset?: number
  limit?: number
}
export async function getPostsWithCount(props: groupPost, topicID: number) {
  const { offset, limit } = props
  return Post.findAndCountAll({
    where: { topicID },
    offset: offset || 0,
    limit: limit || 20,
    include: [
      {
        model: User,
        attributes: ['firstName', 'secondName', 'avatar', 'displayName'],
      },
      {
        model: Reaction,
        attributes: ['like', 'dislike', 'authorID'],
      },
    ],
  })
}
