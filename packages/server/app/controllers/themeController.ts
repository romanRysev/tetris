import { Theme } from '../config/db.config'
import type { Request, Response } from 'express'
import {
  createTheme,
  deleteAllThemes,
  deleteThemeById,
  getAllThemes,
  getThemeById,
  updateThemeByUserID,
} from '../funcs/themeFunctions'

export const createTHemeRow = async (req: Request, res: Response) => {
  const { themeActive, userID, soundOn, musicOn, soundLevel, musicLevel } =
    req.body
  await createTheme({
    themeActive,
    userID,
    soundOn,
    musicOn,
    soundLevel,
    musicLevel,
  })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the Theme.',
      })
    })
}

export const findAll = (req: Request, res: Response) => {
  // теоретически там будет where
  const { themeActive, userID, soundOn, musicOn, soundLevel, musicLevel } =
    req.query
  const condition = {
    themeActive: themeActive || undefined,
    userID: userID || undefined,
    soundOn: soundOn || undefined,
    musicOn: musicOn || undefined,
    soundLevel: soundLevel || undefined,
    musicLevel: musicLevel || undefined,
  }

  Theme.findAll({ where: condition })
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while retrieving Themes.',
      })
    })
}

export const findOne = async (req: Request, res: Response) => {
  const { userID } = req.params
  await getThemeById(Number(userID))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while getting the Theme.',
      })
    })
}

export const update = async (req: Request, res: Response) => {
  const { userID } = req.params
  await updateThemeByUserID(Number(userID), { ...req.body })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the Theme.',
      })
    })
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await deleteThemeById(Number(id))
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
  await deleteAllThemes()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while deleting the Themes.',
      })
    })
}

export const getAll = async (_: any, res: Response) => {
  await getAllThemes()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Themes table.',
      })
    })
}
