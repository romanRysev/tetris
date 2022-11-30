import type { Request, Response } from 'express'
import {
  createUser,
  deleteAllUsers,
  deleteUserById,
  getAllUsers,
  getUserById,
  getUsersByDisplayName,
  updateUserById,
} from './../funcs/userFunctions'

export const createUserRow = async (req: Request, res: Response) => {
  const { firstName, secondName, id , displayName, login, email, phone, avatar } = req.body
  // надо ли верифицировать? у нас же тс
  if (!firstName || !secondName || !id || !login || !email || !phone) {
    res.status(400).send({
      message: 'firstName, secondName, id, login, email, phone can not be empty!',
    })
    return
  }
  await createUser(firstName, secondName, displayName, login, email, phone, avatar, Number(id)  )
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
}

export const findUserByNickName = async (req: Request, res: Response) => {
    const {displayName } = req.body;
    await getUsersByDisplayName(displayName)
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the Users.',
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
      res.status(500).send({
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
      res.status(500).send({
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
      res.status(500).send({
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
      res.status(500).send({
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
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Users table.',
      })
    })
}
