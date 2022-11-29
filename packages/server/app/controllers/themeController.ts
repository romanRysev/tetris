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
import { processResult } from '../utils/processResult';

export const createTHemeRow = async (req: Request, res: Response) => {
  const { themeActive, userID, soundOn, musicOn, soundLevel, musicLevel } =
    req.body;
    await processResult(() => {
      return createTheme({
        themeActive,
        userID,
        soundOn,
        musicOn,
        soundLevel,
        musicLevel,
      })
    }, res, 'Some error occurred while creating the Theme.');

}

export const findAll = async (req: Request, res: Response) => {
  const { themeActive, userID, soundOn, musicOn, soundLevel, musicLevel } =
    req.body
  const condition = {
    themeActive: themeActive || undefined,
    userID: userID || undefined,
    soundOn: soundOn || undefined,
    musicOn: musicOn || undefined,
    soundLevel: soundLevel || undefined,
    musicLevel: musicLevel || undefined,
  }

  await processResult(() => {
    return Theme.findAll({ where: condition })
  }, res, 'Some error occurred while seeking themes.');
}

export const findOne = async (req: Request, res: Response) => {
  const { userID } = req.params
  await processResult(() => {
    return getThemeById(Number(userID))
  }, res, 'Some error occurred while getting the Theme.');
}

export const update = async (req: Request, res: Response) => {
  const { userID } = req.params
  await processResult(() => {
    return updateThemeByUserID(Number(userID), { ...req.body })
  }, res, 'Some error occurred while getting the Theme.');
}

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await processResult(() => {
    return deleteThemeById(Number(id))
  }, res, 'Some error occurred while getting the Theme.');
}

export const deleteAll = async (_: any, res: Response) => {
  await processResult(() => {
    return deleteAllThemes()
  }, res, 'Some error occurred while getting the Theme.');
}

export const getAll = async (_: any, res: Response) => {
  await processResult(() => {
    return getAllThemes()
  }, res, 'Some error occurred while getting the Theme.');
}
