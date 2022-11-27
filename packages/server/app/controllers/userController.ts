import { User } from '../config/db.config'
import type { Request, Response } from 'express'
import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUserById,
} from '../index'

export const createUserRow = async (req: Request, res: Response) => {
  const { firstName, secondName, id , displayName, login, email, phone, avatar } = req.body
  // надо ли верифицировать? у нас же тс
  if (!firstName || !secondName || !id || !login || !email || !phone) {
    res.sendStatus(400).send({
      message: 'firstName, secondName, id, login, email, phone can not be empty!',
    })
    return
  }
  const userID = id;
  await createUser(firstName, secondName, Number(userID), displayName, login, email, phone, avatar  )
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

export const findAll = (req: Request, res: Response) => {
  // теоретически там будет where
  const { firstName, secondName, id , displayName, login, email, phone, avatar } = req.query
  const condition = {
    secondName: secondName || undefined,
    firstName: firstName || undefined,
    userID: id || undefined,
    displayName: displayName || undefined,
    login: login || undefined,
    email: email || undefined,
    phone: phone || undefined,
    avatar: avatar || undefined,
  }

  User.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving users.',
      })
    })
}

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await getUserById(Number(id))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while getting the User.',
      })
    })
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  await updateUserById(Number(id), { ...req.body })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while deleting the User.',
      })
    })
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteUserById(Number(id))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while deleting the User.',
      })
    })
}

export const deleteAll = async (_: any, res: Response) => {
  await deleteAllUsers()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while deleting the Users.',
      })
    })
}

export const getAll = async (_: any, res: Response) => {
  await getAllUsers()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.sendStatus(500).send({
        message:
          err.message || 'Some error occurred while getting the Users table.',
      })
    })
}
