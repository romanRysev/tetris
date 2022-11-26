import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { startApp } from './app'
import bodyParser from 'body-parser'
import { createUserRow, deleteAll, deleteOne, findAll, findOne, getAll, update } from './app/controllers/userHandles'


dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())

startApp()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :) !')
})

// получить всех пользователей 
app.get('/api/user', getAll);

// получить пользователя по id 
app.get('/api/user/:id', findOne);

// удалить пользователя по id
app.delete('/api/user/:id', deleteOne);

//удалить всех пользователей 
app.delete('/api/user', deleteAll);

// найти по параметрам 
app.post('api/user/params', findAll);

// обновить пользователя по id 
app.put('/api/user/:id', update);

// создать пользователя 
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

//пример запроса на findALl
// fetch('/api/user?userID=26', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
// })
