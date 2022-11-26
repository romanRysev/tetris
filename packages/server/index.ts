// import dotenv from 'dotenv'
// import cors from 'cors'
// import express from 'express'
// import { startApp } from './app'

// dotenv.config()

// const app = express()
// app.use(cors())
// const port = Number(process.env.SERVER_PORT) || 3001

// startApp()

// app.get('/', (_, res) => {
//   res.json('👋 Howdy from the server :)')
// })

// app.listen(port, () => {
//   console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
// })

import dotenv from 'dotenv'
import cors from 'cors'
import express, { Request, Response } from 'express'
import { createUser, deleteAllUsers, deleteUserById, getAllUsers, getUserById, startApp, updateUserById } from './app'
import bodyParser from 'body-parser'
// import { userModel } from "./app/models/user";
import 'reflect-metadata'

dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())
// userModel.sequelize.sync();

startApp()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :) !')
})

// получить всех пользователей - работает
app.get('/api/user', async (_, res) => {
  await getAllUsers()
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while getting the Users table.',
      })
    })
})

// получить пользователя по id - работает
app.get('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await getUserById(Number(id))
    .then(data => {
      res.send(data)
    })
    .catch(err => {
      res.sendStatus(500).send({
        message:
          err.message || 'Some error occurred while getting the User.',
      })
    })
})

// удалить пользователя по id - работает
app.delete('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await deleteUserById(Number(id))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message:
          err.message || 'Some error occurred while deleting the User.',
      })
    })
})

//удалить всех пользователей - работает
app.delete('/api/user', async (_, res: Response) => {
  await deleteAllUsers()
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message:
          err.message || 'Some error occurred while deleting the Users.',
      })
    })
})

// найти по параметрам - с данными разобраться

// обновить пользователя по id - работает
app.put('/api/user/:id', async (req: Request, res: Response) => {
  const { id } = req.params;
  await updateUserById(Number(id), {...req.body})
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message:
          err.message || 'Some error occurred while deleting the User.',
      })
    })
})

// создать пользователя - работает
app.post('/api/user', async (req: Request, res: Response) => {
  const { firstName, lastName, userID } = req.body
  // надо ли верифицировать? у нас же тс
  if (!firstName || !lastName || !userID) {
    res.sendStatus(400).send({
      message: 'First name and Last name can not be empty!',
    })
    return
  }
  await createUser(firstName, lastName, Number(userID))
    .then(data => {
      res.send(JSON.stringify(data))
    })
    .catch(err => {
      res.sendStatus(500).send({
        message: err.message || 'Some error occurred while creating the User.',
      })
    })
})

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})


// fetch('/api/user', {
//   method: 'POST',
//   headers: {
//     'Content-Type': 'application/json'
//   },
//   body: JSON.stringify({
//     firstName: 'asd',
//     lastName: 'Fds',
//     userID: 14,
//   })
// })
