import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import { startApp } from './app/config/db.config'
import bodyParser from 'body-parser'
import userRouter from './routes/userRoutes'
import themeRouter from './routes/themeRoutes'
import forumRouter from './routes/forumRoutes'

dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())

app.use('/api/user', userRouter);
app.use('/api/theme', themeRouter);
app.use('/api/forum', forumRouter);

startApp()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :) ')
})

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
//     firstName: "Mort",
//     secondName: "Emperorsson",
//     id: "234",
//     displayName: "",
//     login: "mort",
//     email: "mort@morty.mort",
//     phone: "0987654321",
//     avatar: "",
//   })
// })

//пример запроса на findALl
// fetch('/api/user?userID=26', {
//   method: 'GET',
//   headers: {
//     'Content-Type': 'application/x-www-form-urlencoded'
//   },
// })
