import { processResult } from '../utils/processResult';
import type { Request, Response } from 'express'
import * as reactionFuncs from '../funcs/reactionFunctions'

// поставить / снять лайк - PUT
export const reactionLike = async (req: Request, res: Response) => {
  const { authorID, postID, like } = req.body
  await processResult(() => {
    return reactionFuncs.toggleLike({ authorID, postID, like })
  }, res, 'Some error occurred while setting like.');
}

// поставить / снять дизлайк - PUT
export const reactionDislike = async (req: Request, res: Response) => {
  const { authorID, postID, dislike } = req.body
  await processResult(() => {
    return reactionFuncs.toggleDislike({ authorID, postID, dislike })
  }, res, 'Some error occurred while setting dislike.');
}

// получить реакции поста
export const getReactionsByPostID = async (req: Request, res: Response) => {
  const { postID } = req.query
  await processResult(() => {
    return reactionFuncs.getReactionsForPost(Number(postID))
  }, res, 'Some error occurred while fetching reactions.');
}

// получить лайки поста
export const getLikesByPostID = async (req: Request, res: Response) => {
  const { postID } = req.query
  await processResult(() => {
    return reactionFuncs.getLikesForPost(Number(postID))
  }, res, 'Some error occurred while fetching likes.');
}

// получить дизлайки поста
export const getDislikesByPostID = async (req: Request, res: Response) => {
  const { postID } = req.query
  await processResult(() => {
    return reactionFuncs.getDislikesForPost(Number(postID))
  }, res, 'Some error occurred while fetching dislikes.');
}
