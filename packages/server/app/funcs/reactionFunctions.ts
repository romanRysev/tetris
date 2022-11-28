import { Reaction } from '../config/db.config'

type ReactionProps = {
  authorID: number
  postID: number
  like?: boolean
  dislike?: boolean
}

// поставить / снять лайк на пост
export async function toggleLike(props: ReactionProps) {
  const { authorID, postID, like } = props
  return Reaction.findOrCreate({ where: { authorID, postID } }).then(() => {
    Reaction.update({ like }, { where: { authorID, postID } })
  })
}

// поставить / снять дизлайк на пост
export async function toggleDislike(props: ReactionProps) {
  const { authorID, postID, dislike } = props
  return Reaction.findOrCreate({ where: { authorID, postID } }).then(() => {
    Reaction.update({ dislike }, { where: { authorID, postID } })
  })
}

// получить реакции поста
export async function getReactionsForPost(postID: number) {
  return Reaction.findAndCountAll({ where: { postID } })
}

// получить лайки поста
export async function getLikesForPost(postID: number) {
  return Reaction.findAndCountAll({ where: { postID, like: true } })
}

// получить дизлайки поста
export async function getDislikesForPost(postID: number) {
  return Reaction.findAndCountAll({ where: { postID, dislike: true } })
}
