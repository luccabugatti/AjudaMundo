import { Router, Request, Response } from 'express'

const routes = Router()

routes.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'up',
  })
})

export { routes }
