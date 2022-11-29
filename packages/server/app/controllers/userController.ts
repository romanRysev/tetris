import { processResult } from '../utils/processResult'
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
  if (!firstName || !secondName || !id || !login || !email || !phone) {
    res.status(400).send({
      message: 'firstName, secondName, id, login, email, phone can not be empty!',
    })
    return
  }
  const userID = id;
  await processResult(() => {
    return createUser(firstName, secondName, Number(userID), displayName, login, email, phone, avatar  )
  }, res, 'Some error occurred while creating the User.');

}

export const findUserByNickName = async (req: Request, res: Response) => {
    const {displayName } = req.body;
    await processResult(() => {
      return getUsersByDisplayName(displayName)
    }, res, 'Some error occurred while getting the Users.');
  }

export const findOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return getUserById(Number(id))
  }, res, 'Some error occurred while getting the User.');
}

export const update = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return updateUserById(Number(id), { ...req.body })
  }, res, 'Some error occurred while deleting the User.');
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return deleteUserById(Number(id))
  }, res, 'Some error occurred while deleting the User.');
}

export const deleteAll = async (_: any, res: Response) => {
  await processResult(() => {
    return deleteAllUsers()
  }, res, 'Some error occurred while deleting the Users.');
}

export const getAll = async (_: any, res: Response) => {
  await processResult(() => {
    return getAllUsers()
  }, res, 'Some error occurred while getting the Users table.');
}
