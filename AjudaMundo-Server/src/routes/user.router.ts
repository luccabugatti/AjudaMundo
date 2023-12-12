import { Router, Request, Response } from 'express'

import { makeValidateBody, validateToken } from '../middlewares'

import { UserFactory, CreateUserDto, LoginDto } from '../modules/User'

const routes = Router()

routes.get('/', validateToken, async (req: Request, res: Response) => {
  await UserFactory().findAllUsers(req, res)
})

routes.get('/:id', validateToken, async (req: Request, res: Response) => {
  await UserFactory().findUserById(req, res)
})

routes.post(
  '/',
  makeValidateBody(CreateUserDto),
  async (req: Request, res: Response) => {
    await UserFactory().createUser(req, res)
  },
)

routes.post(
  '/login',
  makeValidateBody(LoginDto),
  async (req: Request, res: Response) => {
    await UserFactory().login(req, res)
  },
)

routes.get('/login/get-user', async (req: Request, res: Response) => {
  await UserFactory().getUserData(req, res)
})

export { routes }
