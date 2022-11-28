import type { Request, Response } from 'express'
// import { createTheme, deleteAllThemes, deleteThemeById, getAllThemes, getThemeById, updateThemeByUserID } from '../funcs/themeFunctions'
import * as postFuncs from '../funcs/postFunctions'

// authorID: number
// topicID: number
// message: string
// timestamp: Date // или string или вообще не нужен, автоматически создается
// hide: boolean
// firstLevel: boolean
// parentID: number

// создать пост - POST
export const createNewPost = async (req: Request, res: Response) => {
  const { authorID, message, parentID } = req.body;
  const { topicID } = req.params;
  await postFuncs.createPost({ authorID, topicID: Number(topicID), message, parentID })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the post.',
      })
    })
}

// получить список постов темы с пагинацией - параметры в урл
export const getPostListForTopic = async (req: Request, res: Response) => {
  const {topicID} = req.params;
  await postFuncs.getPostsWithCount({...req.query}, Number(topicID))
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while getting the Posts table.',
    })
  })
}

// получить список постов юзера, опционально в теме - параметры в урл
export const getPostListByAuthor = async (req: Request, res: Response) => {
  const {userID, topicID} = req.query;
  await postFuncs.getPostsByAuthor(Number(userID), Number(topicID))
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while getting the Posts table.',
    })
  })
}

// // получить список тем с сортировкой по lastReply и ограничением количества - offset и limit в url
// export const getTopicListWithCount = async (req: Request, res: Response) => {
//   // const { offset, limit } = req.query;
//   await topicFuncs.getTopicsWithCount({...req.query})
//   .then(data => {
//     res.send(data)
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || 'Some error occurred while getting the Topics.',
//     })
//   })
// }

// // получить список тем по автору - айди автора в url
// export const getTopicListByAuthor = async (req: Request, res: Response) => {
//   const {userID} = req.params;
//   await topicFuncs.getTopicsByAuthor(Number(userID))
//   .then(data => {
//     res.send(data)
//   })
//   .catch(err => {
//     res.status(500).send({
//       message:
//         err.message || 'Some error occurred while getting the Topics.',
//     })
//   })
// }



// export const findAll = (req: Request, res: Response) => {
//   const { themeActive, userID, soundOn, musicOn, soundLevel, musicLevel } = req.query
//   const condition = {
//     themeActive: themeActive || undefined,
//     userID: userID || undefined,
//     soundOn: soundOn || undefined,
//     musicOn: musicOn || undefined,
//     soundLevel: soundLevel || undefined,
//     musicLevel: musicLevel || undefined,
//   }

//   Theme.findAll({ where: condition })
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while retrieving Themes.',
//       })
//     })
// }

// export const findOne = async (req: Request, res: Response) => {
//   const { userID } = req.params
//   await getThemeById(Number(userID))
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while getting the Theme.',
//       })
//     })
// }

// export const update = async (req: Request, res: Response) => {
//   const { userID } = req.params
//   await updateThemeByUserID(Number(userID), { ...req.body })
//     .then(data => {
//       res.send(JSON.stringify(data))
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: err.message || 'Some error occurred while deleting the Theme.',
//       })
//     })
// }

export const deleteOne = async (req: Request, res: Response) => {
  const { id } = req.params
  await postFuncs.deletePostById(Number(id))
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
  await postFuncs.deleteAllPosts()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the Topics.',
      })
    })
}

export const getAll = async (_: any, res: Response) => {
  console.log(res);
  await postFuncs.getAllPosts()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message,
      })
    })
}

// export const getAll = async (_: any, res: Response) => {
//   await getAllThemes()
//     .then(data => {
//       res.send(data)
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || 'Some error occurred while getting the Themes table.',
//       })
//     })
// }
