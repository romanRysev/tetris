import type { Request, Response } from 'express'
// import { createTheme, deleteAllThemes, deleteThemeById, getAllThemes, getThemeById, updateThemeByUserID } from '../funcs/themeFunctions'
import * as topicFuncs from '../funcs/topicFunctions'
/*
Что нам надо

список топиков (варианты - от последнего к первому, с сортировкой по дате посл ответа)
- с автором (ищем по id в юзерах)
- с последним ответом (ищем по id в постах)
- дата создания там есть


список постов топика от первого к последнему (сюда прикрутить пагинацию, вроде такое видели)
- с автором (ищем по id в юзерах)
- с лайками (по id темы + id поста)

потом еще как-то одревовидеться
*/

// fetch('/api/forum', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     title: 'когда уже все сделаем-то а?',
//     authorID: 234,
//   })
// })

    //   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstName: "Mort",
//     secondName: "Emperorsson",
//     id: "234",
//     displayName: "",
//     login: "mort",
//     email: "mort@morty.mort",
//     phone: "0987654321",
//     avatar: "",
//   })

// создать тему - POST
export const createTopicRow = async (req: Request, res: Response) => {
  const { title, authorID } = req.body
  await topicFuncs.createTopic({ title, authorID, closed: false })
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the topic.',
      })
    })
}

// получить список тем
export const getTopicList = async (_: any, res: Response) => {
  await topicFuncs.getAllTopics()
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while getting the Topics table.',
    })
  })
}

// получить список тем с сортировкой по lastReply и ограничением количества - offset и limit в url
export const getTopicListWithCount = async (req: Request, res: Response) => {
  // const { offset, limit } = req.query;
  await topicFuncs.getTopicsWithCount({...req.query})
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while getting the Topics.',
    })
  })
}

// получить список тем по автору - айди автора в url
export const getTopicListByAuthor = async (req: Request, res: Response) => {
  const {userID} = req.params;
  await topicFuncs.getTopicsByAuthor(Number(userID))
  .then(data => {
    res.send(data)
  })
  .catch(err => {
    res.status(500).send({
      message:
        err.message || 'Some error occurred while getting the Topics.',
    })
  })
}



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
  await topicFuncs.deleteTopicById(Number(id))
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
  await topicFuncs.deleteAllTopics()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || 'Some error occurred while deleting the Topics.',
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
