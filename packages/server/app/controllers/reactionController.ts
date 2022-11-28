import type { Request, Response } from 'express'
import * as reactionFuncs from '../funcs/reactionFunctions'

// authorID: number
// postID: number
// like?: boolean
// dislike?: boolean

// поставить / снять лайк - PUT
export const reactionLike = async (req: Request, res: Response) => {
  console.log('4');
  const {authorID, postID, like} = req.body;
  await reactionFuncs.toggleLike({ authorID, postID, like })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while setting like.',
      })
    })
}

// поставить / снять дизлайк - PUT
export const reactionDislike = async (req: Request, res: Response) => {
  const {authorID, postID, dislike} = req.body;
  await reactionFuncs.toggleDislike({ authorID, postID, dislike })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while setting dislike.',
      })
    })
}

// получить реакции поста
export const getReactionsByPostID = async (req: Request, res: Response) => {
  console.log('3');
  const { postID } = req.query;
  await reactionFuncs.getReactionsForPost(Number(postID))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while fetching reactions.',
      })
    })
}

// получить лайки поста
export const getLikesByPostID = async (req: Request, res: Response) => {
  const { postID } = req.query;
  console.log('1');
  await reactionFuncs.getLikesForPost(Number(postID))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while fetching likes.',
      })
    })
}

// получить дизлайки поста
export const getDislikesByPostID = async (req: Request, res: Response) => {
  console.log('2');
  const { postID } = req.query;
  await reactionFuncs.getDislikesForPost(Number(postID))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while fetching dislikes.',
      })
    })
}
