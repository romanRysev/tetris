import { processResult } from '../utils/processResult'
import type { Request, Response } from 'express'
import * as leaderFuncs from '../funcs/leaderFunctions'

// создать запись - PUT
export const createOrUpdateLeader = async (req: Request, res: Response) => {
  const {userID, score} = req.body;
  await processResult(() => {
    return leaderFuncs.createLeader({ userID, score })
  }, res, 'Some error occurred while creating.');
}

// обновить запись (счет) - PUT
export const updateLeader = async (req: Request, res: Response) => {
  const {userID, score} = req.body;
  await processResult(() => {
    return leaderFuncs.updateLeader({ userID, score })
  }, res, 'Some error occurred while updating.');
}

// получить записи с сортировкой по счету и опционально пагинацией
export const getLeaderBoard = async (req: Request, res: Response) => {
  const {offset, limit} = req.body;
  await processResult(() => {
    return leaderFuncs.getAllLeaders(Number(offset), Number(limit))
  }, res, 'Some error occurred while updating.');
}

// получить запись по userID
export const getLeader = async (req: Request, res: Response) => {
  const { userID } = req.params;
  await processResult(() => {
    return leaderFuncs.getLeader(Number(userID))
  }, res, 'Some error occurred while updating.');
}

// удалить запись по userID
export const deleteLeader = async (req: Request, res: Response) => {
  const { userID } = req.params;
  await processResult(() => {
    return leaderFuncs.deleteLeaderByUserId(Number(userID))
  }, res, 'Some error occurred while updating.');
}

// удалить все записи
export const deleteAllLeaders = async (_: any, res: Response) => {
  await processResult(() => {
    return leaderFuncs.deleteAllLeaders()
  }, res, 'Some error occurred while updating.');
}
