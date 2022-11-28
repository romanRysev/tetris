import { Reaction } from '../config/db.config'

type ReactionProps = {
  authorID: number
  postID: number
  like?: boolean
  dislike?: boolean
}

// поставить / снять лайк на пост
export async function toggleLike(props: ReactionProps) {
  console.log('5');
  const {authorID, postID, like} = props;
  return Reaction.findOrCreate({where: {authorID, postID} }).then(() => {
    Reaction.update({ like }, { where: {authorID, postID} })
  })
}

// поставить / снять дизлайк на пост
export async function toggleDislike(props: ReactionProps) {
  console.log('6');
  const {authorID, postID, dislike} = props;
  return Reaction.findOrCreate({where: {authorID, postID} }).then(() => {
    Reaction.update({ dislike }, { where: {authorID, postID} })
  })
}

// получить реакции поста
export async function getReactionsForPost(postID: number) {
  console.log('7');
  return Reaction.findAndCountAll({ where: { postID } })
}


// получить лайки поста
export async function getLikesForPost(postID: number) {
  console.log('8');
  return Reaction.findAndCountAll({ where: { postID, like: true } })
}

// получить дизлайки поста
export async function getDislikesForPost(postID: number) {
  console.log('9');
  return Reaction.findAndCountAll({ where: { postID, dislike: true } })
}
