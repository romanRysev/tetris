import type { Request, Response } from 'express'
import * as postFuncs from '../funcs/postFunctions'

// создать пост - POST
export const createNewPost = async (req: Request, res: Response) => {
  const { authorID, message, parentID } = req.body
  const { topicID } = req.params
  await postFuncs
    .createPost({ authorID, topicID: Number(topicID), message, parentID })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the post.',
      })
    })
}

// получить список постов темы с пагинацией - параметры в урл
export const getPostListForTopic = async (req: Request, res: Response) => {
  const { topicID } = req.params
  await postFuncs
    .getPostsWithCount({ ...req.query }, Number(topicID))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Posts table.',
      })
    })
}

// получить список постов юзера, опционально в теме - параметры в урл
export const getPostListByAuthor = async (req: Request, res: Response) => {
  const { userID, topicID } = req.query
  await postFuncs
    .getPostsByAuthor(Number(userID), Number(topicID))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Posts table.',
      })
    })
}

// удалить пост
export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await postFuncs
    .deletePostById(Number(id))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the Theme.',
      })
    })
}

// удалить все посты
export const deleteAll = async (_: any, res: Response) => {
  await postFuncs
    .deleteAllPosts()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while deleting the Topics.',
      })
    })
}

// получить список всех постов
export const getAll = async (_: any, res: Response) => {
  await postFuncs
    .getAllPosts()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      })
    })
}
