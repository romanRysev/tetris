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
  const { firstName, lastName, userID } = req.body
  // надо ли верифицировать? у нас же тс
  if (!firstName || !lastName || !userID) {
    res.sendStatus(400).send({
      message: 'First name and Last name can not be empty!',
    })
    return
  }
  await createUser(firstName, lastName, Number(userID))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

// это надо написать
export const findAll = (req: Request, res: Response) => {
  // теоретически там будет where
  const { firstName, lastName, userID } = req.query
  const condition = {
    lastName: lastName || undefined,
    firstName: firstName || undefined,
    userID: userID || undefined,
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
