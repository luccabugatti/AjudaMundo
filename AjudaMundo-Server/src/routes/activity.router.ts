import { Router, Request, Response } from 'express'

import { makeValidateBody, validateToken } from '../middlewares'

import {
  ActivityFactory,
  CreateActivityDto,
  DoActivityDto,
  UpdateActivityDto,
} from '../modules/Activity'

const routes = Router()

routes.get('/', validateToken, async (req: Request, res: Response) => {
  await ActivityFactory().findAllActivities(req, res)
})

routes.get(
  '/ong-activities',
  validateToken,
  async (req: Request, res: Response) => {
    await ActivityFactory().getOngActivities(req, res)
  },
)

routes.get('/user-activities', validateToken, async (req: Request, res: Response) => {
  await ActivityFactory().getUserAssignedActivities(req, res)
})

routes.get('/unassigned-activities', validateToken, async (req: Request, res: Response) => {
  await ActivityFactory().getUnassignedActivities(req, res)
})

routes.get('/:id', validateToken, async (req: Request, res: Response) => {
  await ActivityFactory().findActivityById(req, res)
})

routes.post(
  '/',
  validateToken,
  makeValidateBody(CreateActivityDto),
  async (req: Request, res: Response) => {
    await ActivityFactory().createActivity(req, res)
  },
)

routes.patch(
  '/:id',
  validateToken,
  makeValidateBody(UpdateActivityDto),
  async (req: Request, res: Response) => {
    await ActivityFactory().updateActivity(req, res)
  },
)

routes.post(
  '/assign/:id',
  validateToken,
  async (req: Request, res: Response) => {
    await ActivityFactory().assingToActivity(req, res)
  },
)

routes.post(
  '/do/:id',
  validateToken,
  makeValidateBody(DoActivityDto),
  async (req: Request, res: Response) => {
    await ActivityFactory().doActivity(req, res)
  },
)

routes.delete('/:id', validateToken, async (req: Request, res: Response) => {
  await ActivityFactory().deleteActivityById(req, res)
})

export { routes }
