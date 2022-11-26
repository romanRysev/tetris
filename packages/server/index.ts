import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { startApp } from './app'
import bodyParser from 'body-parser'
import { createUserRow, deleteAll, deleteOne, findOne, getAll, update } from './app/controllers/tutorial.controller'


dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())

startApp()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :) !')
})

// получить всех пользователей - работает
app.get('/api/user', getAll);

// получить пользователя по id - работает
app.get('/api/user/:id', findOne);

// удалить пользователя по id - работает
app.delete('/api/user/:id', deleteOne);

//удалить всех пользователей - работает
app.delete('/api/user', deleteAll);

// найти по параметрам - с данными разобраться

// обновить пользователя по id - работает
app.put('/api/user/:id', update);

// создать пользователя - работает
app.post('/api/user', createUserRow);

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})

//пример запроса
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
