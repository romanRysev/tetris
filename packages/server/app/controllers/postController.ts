import { processResult } from '../utils/processResult'
import type { Request, Response } from 'express'
import * as postFuncs from '../funcs/postFunctions'

// создать пост - POST
export const createNewPost = async (req: Request, res: Response) => {
  const { authorID, message, parentID } = req.body
  const { topicID } = req.params
  await processResult(() => {
    return postFuncs.createPost({ authorID, topicID: Number(topicID), message, parentID })
  }, res, 'Some error occurred while creating the post.');
}

// получить список постов темы с пагинацией - параметры в урл
export const getPostListForTopic = async (req: Request, res: Response) => {
  const { topicID } = req.params
  await processResult(() => {
    return postFuncs.getPostsWithCount({ ...req.query }, Number(topicID))
  }, res, 'Some error occurred while getting the Posts table.');
}

// получить список постов юзера, опционально в теме - параметры в урл
export const getPostListByAuthor = async (req: Request, res: Response) => {
  const { userID, topicID } = req.query
  await processResult(() => {
    return postFuncs.getPostsByAuthor(Number(userID), Number(topicID))
  }, res, 'Some error occurred while getting the Posts table.');
}

// удалить пост
export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return postFuncs.deletePostById(Number(id))
  }, res, 'Some error occurred while deleting the Theme.');
}

// удалить все посты
export const deleteAll = async (_: any, res: Response) => {
  await processResult(() => {
    return postFuncs.deleteAllPosts()
  }, res, 'Some error occurred while deleting the Topics.');
}

// получить список всех постов
export const getAll = async (_: any, res: Response) => {
  await processResult(() => {
    return postFuncs.getAllPosts()
  }, res, 'Some error occurred while fetching the Posts.');
}
