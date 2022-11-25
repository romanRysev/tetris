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
import express from 'express'
import { startApp } from './app'
import bodyParser from "body-parser";
// import { userModel } from "./app/models/user";
import 'reflect-metadata';

dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json());
// userModel.sequelize.sync();

startApp()

app.get('/', (_, res) => {
  res.json('👋 Howdy from the server :) !')
})

// getAll
app.get('/api/user', (_, res) => {
  res.send('ну гет');
})



app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})

