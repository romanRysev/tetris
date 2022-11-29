import { processResult } from '../utils/processResult';
import type { Request, Response } from 'express'
import * as topicFuncs from '../funcs/topicFunctions'

// создать тему - POST
export const createTopicRow = async (req: Request, res: Response) => {
  const { title, authorID } = req.body
  await processResult(() => {
    return topicFuncs.createTopic({ title, authorID, closed: false })
  }, res, 'Some error occurred while creating the topic.');
}

// редактировать тему (последний ответ)
export const setLastReply = async (req: Request, res: Response) => {
  const { lastReply, id } = req.body;
  await processResult(() => {
    return topicFuncs.updateTopicByID(id, lastReply)
  }, res, 'Some error occurred while updating the topic.');
}

// получить список тем
export const getTopicList = async (_: any, res: Response) => {
  await processResult(() => {
    return topicFuncs.getAllTopics()
  }, res, 'Some error occurred while getting the Topics table.');
}

// получить список тем с сортировкой по lastReply и ограничением количества - offset и limit в url
export const getTopicListWithCount = async (req: Request, res: Response) => {
  await processResult(() => {
    return topicFuncs.getTopicsWithCount({ ...req.query })
  }, res, 'Some error occurred while getting the Topics.');
}

// получить список тем по автору - айди автора в url
export const getTopicListByAuthor = async (req: Request, res: Response) => {
  const { userID } = req.params
  await processResult(() => {
    return topicFuncs.getTopicsByAuthor(Number(userID))
  }, res, 'Some error occurred while getting the Topics.');
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return topicFuncs.deleteTopicById(Number(id))
  }, res, 'Some error occurred while deleting the Theme.');
}

export const deleteAll = async (_: any, res: Response) => {
  await processResult(() => {
    return topicFuncs.deleteAllTopics()
  }, res, 'Some error occurred while deleting the Topics.');
}
