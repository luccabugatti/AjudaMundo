import { Router, Request, Response } from 'express'

import { makeValidateBody, validateToken } from '../middlewares'

import { OngFactory, CreateOngDto, LoginDto } from '../modules/Ong'

const routes = Router()

routes.get('/', validateToken, async (req: Request, res: Response) => {
  await OngFactory().findAllOngs(req, res)
})

routes.get('/:id', validateToken, async (req: Request, res: Response) => {
  await OngFactory().findOngById(req, res)
})

routes.post(
  '/',
  makeValidateBody(CreateOngDto),
  async (req: Request, res: Response) => {
    await OngFactory().createOng(req, res)
  },
)

routes.post(
  '/login',
  makeValidateBody(LoginDto),
  async (req: Request, res: Response) => {
    await OngFactory().login(req, res)
  },
)

routes.get('/login/get-ong', async (req: Request, res: Response) => {
  await OngFactory().getOngData(req, res)
})

export { routes }
