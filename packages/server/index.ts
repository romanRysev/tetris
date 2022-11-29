import dotenv from 'dotenv'
import cors from 'cors'
import express from 'express'
import * as path from 'path'
import * as fs from 'fs'
import bodyParser from 'body-parser'

import { startApp } from './app/config/db.config'

import userRouter from './routes/userRoutes'
import themeRouter from './routes/themeRoutes'
import forumRouter from './routes/forumRoutes'

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { render } from '../client/dist/ssr/entry-server.cjs'

dotenv.config()

const app = express()
app.use(cors())
const port = Number(process.env.SERVER_PORT) || 3001

app.use(bodyParser.json())

app.use('/api/user', userRouter)
app.use('/api/theme', themeRouter)
app.use('/api/forum', forumRouter)

startApp()

app.get('/', (_, res) => {
  const result = render()
  const template = path.resolve(__dirname, '../client/dist/client/index.html')
  const htmlString = fs.readFileSync(template, 'utf-8')
  const newString = htmlString.replace('<!--ssr-outlet-->', result)
  res.send(newString)
})

app.use(express.static(path.resolve(__dirname, '../client/dist/client')))

app.listen(port, () => {
  console.log(`  ➜ 🎸 Server is listening on port: ${port}`)
})
