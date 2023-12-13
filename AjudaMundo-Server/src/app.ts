import 'dotenv/config'
import express from 'express'
import cors from 'cors'

import { InitializeDatabase } from './data-source'

import { healthRouter, ongRouter, userRouter, activityRouter } from './routes'

import 'reflect-metadata'

const app = express()
app.use(
  cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
    allowedHeaders:
      'origin, X-Requested-With, Content-Type, Accept, Authorization, token, OPTIONS',
  }),
)

if(process.env.NODE_ENV !== 'test') {
  InitializeDatabase()
  .then(() => {
    console.log('Banco inicializado com sucesso')
  })
  .catch((e) => {
    console.log('erro ao iniciar banco', e)
  })
}

app.use(express.json())

app.use('/health', healthRouter.routes)
app.use('/ong', ongRouter.routes)
app.use('/user', userRouter.routes)
app.use('/activity', activityRouter.routes)

export { app }
