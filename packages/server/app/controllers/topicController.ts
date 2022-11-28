import type { Request, Response } from 'express'
import * as topicFuncs from '../funcs/topicFunctions'

// создать тему - POST
export const createTopicRow = async (req: Request, res: Response) => {
  const { title, authorID } = req.body
  await topicFuncs
    .createTopic({ title, authorID, closed: false })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the topic.',
      })
    })
}

// редактировать тему (последний ответ)
export const setLastReply = async (req: Request, res: Response) => {
  const { lastReply, id } = req.body;
  await topicFuncs
    .updateTopicByID(id, lastReply)
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while updating the topic.',
      })
    })
}

// получить список тем
export const getTopicList = async (_: any, res: Response) => {
  await topicFuncs
    .getAllTopics()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Topics table.',
      })
    })
}

// получить список тем с сортировкой по lastReply и ограничением количества - offset и limit в url
export const getTopicListWithCount = async (req: Request, res: Response) => {
  await topicFuncs
    .getTopicsWithCount({ ...req.query })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the Topics.',
      })
    })
}

// получить список тем по автору - айди автора в url
export const getTopicListByAuthor = async (req: Request, res: Response) => {
  const { userID } = req.params
  await topicFuncs
    .getTopicsByAuthor(Number(userID))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the Topics.',
      })
    })
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await topicFuncs
    .deleteTopicById(Number(id))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the Theme.',
      })
    })
}

export const deleteAll = async (_: any, res: Response) => {
  await topicFuncs
    .deleteAllTopics()
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
