import { UpdateActivityDto, CreateActivityDto, DoActivityDto } from './dtos'
import { ActivityService } from './ActivityService'
import { UserService } from '../User'
import { OngService } from '../Ong'

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { ActivityStatusEnum } from './enums'

class ActivityController {
  constructor(
    private readonly activityService: ActivityService,
    private readonly userService: UserService,
    private readonly ongService: OngService,
  ) {}

  async findAllActivities(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const activities = await this.activityService.findAllActivities()

      return res.status(201).json({
        activities,
      })
    } catch (error) {
      console.log('ActivityController.findAllActivities error', error)
      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: error.message,
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async getOngActivities(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        const { ongId } = await this.ongService.findOngByEmail(email)

        const activities = await this.activityService.getOngActivities(ongId)

        return res.status(201).json({
          activities,
        })
      } else {
        throw new Error('Erro ao validar token')
      }
    } catch (error) {
      console.log('ActivityController.getOngActivities error', error)
      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: error.message,
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async getUserAssignedActivities(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        const user = await this.userService.findUserByEmail(email)

        const activities = await this.activityService.getUserAssignedActivities(
          user.userId,
        )

        return res.status(200).json({
          activities,
        })
      } else {
        throw new Error('Erro ao validar token')
      }
    } catch (error) {
      console.log('ActivityController.getUserAssignedActivities error', error)
      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: error.message,
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async getUnassignedActivities(req: Request, res: Response) {
    try {
      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        
        await this.userService.findUserByEmail(email)

        const activities = await this.activityService.getUnassignedActivities()

        return res.status(200).json({
          activities,
        })
      } else {
        throw new Error('Erro ao validar token')
      }
    } catch (error) {
      console.log('ActivityController.getUnassignedActivities error', error)
      if (error instanceof Error) {
        switch (error.message) {
          case 'Usuário não encontrado!':
            return res.status(428).json({
              erro: true,
              message: 'Somente usuários podem consultar atividades não atribuídas',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async updateActivity(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const activityId = params.id

      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        const { ongId: validationId } = await this.ongService.findOngByEmail(
          email,
        )

        const body: UpdateActivityDto = req.body

        const {
          description,
          name,
          ongId,
          points,
          mainImg,
          realizationField,
          status,
          userId,
        } = body

        const activity = await this.activityService.findActivityById(
          Number(activityId),
        )

        if (activity?.ongId !== validationId) {
          return res.status(403).json({
            erro: true,
            message: 'Somente a ong que criou a atividade pode atualizá-la',
          })
        }

        if (activity?.status === ActivityStatusEnum.DONE) {
          return res.status(409).json({
            erro: true,
            message: 'Atividades finalizadas não podem ser alteradas',
          })
        }

        if (activity?.status === ActivityStatusEnum.ASSIGNED) {
          return res.status(409).json({
            erro: true,
            message: 'Atividades atribuídas não podem ser alteradas',
          })
        }

        const result = await this.activityService.updateActivity(
          Number(activityId),
          validationId,
          {
            description,
            name,
            ongId,
            points,
            mainImg,
            realizationField,
            status,
            userId,
          },
        )

        return res.status(200).json({
          result,
        })
      } else {
        throw new Error('Erro ao validar token')
      }
    } catch (error) {
      console.log('ActivityController.updateActivity error', error)
      if (error instanceof Error) {
        switch (error.message) {
          case 'Ong não encontrada!':
            return res.status(428).json({
              erro: true,
              message: 'Usuários não podem atualizar atividades',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async createActivity(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: CreateActivityDto = req.body
      const { name, points, description, mainImg, status, ongId, userId } = body

      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        await this.ongService.findOngByEmail(email)
      }

      const result = await this.activityService.createActivity({
        name,
        points,
        description,
        mainImg,
        status,
        ongId,
        userId,
      })

      console.log(result)

      return res.status(200).json({
        result,
      })
    } catch (error) {
      console.log('ActivityController.createActivity error', error)
      if (error instanceof Error) {
        switch (error.message) {
          case 'Ong não encontrada!':
            return res.status(428).json({
              erro: true,
              message: 'Somente ongs podem criar atividades',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async findActivityById(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const activityId = params.id

      const result = await this.activityService.findActivityById(
        Number(activityId),
      )

      console.log(result)

      return res.status(200).json({
        result,
      })
    } catch (error) {
      console.log('ActivityController.findActivityById error', error)

      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: error.message,
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async deleteActivityById(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const activityId = params.id

      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }
        const { ongId: validationId } = await this.ongService.findOngByEmail(
          email,
        )

        const activity = await this.activityService.findActivityById(
          Number(activityId),
        )

        if (activity?.ongId !== validationId) {
          return res.status(403).json({
            erro: true,
            message: 'Somente a ong que criou a atividade pode deleta-la',
          })
        }

        if (activity?.status === ActivityStatusEnum.DONE) {
          return res.status(409).json({
            erro: true,
            message: 'Atividades finalizadas não podem ser deletadas',
          })
        }

        if (activity?.status === ActivityStatusEnum.ASSIGNED) {
          return res.status(409).json({
            erro: true,
            message: 'Atividades atribuídas não podem ser deletadas',
          })
        }

        await this.activityService.deleteActivityById(
          Number(activityId),
          validationId,
        )
      }

      return res.status(204).json({
        message: 'Atividade deletada com sucesso!',
      })
    } catch (error) {
      console.log('ActivityController.deleteActivityById error', error)

      if (error instanceof Error) {
        switch (error.message) {
          case 'Ong não encontrada!':
            return res.status(428).json({
              erro: true,
              message: 'Usuários não podem deletar atividades',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async assingToActivity(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const activityId = params.id

      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }

        const user = await this.userService.findUserByEmail(email)

        const activity = await this.activityService.findActivityById(
          Number(activityId),
        )

        if (activity?.userId) {
          return res.status(409).json({
            erro: true,
            message: 'Atividade já atribuída a um usuário',
          })
        }

        const assigned = await this.activityService.assingToActivity(
          Number(activityId),
          user.userId,
        )

        return res.status(200).json({
          message: 'Atividade atribuída com sucesso!',
          assigned,
        })
      } else {
        throw new Error('Erro ao atribuir atividade para usuário')
      }
    } catch (error) {
      console.log('ActivityController.assingToActivity error', error)

      if (error instanceof Error) {
        switch (error.message) {
          case 'Usuário não encontrado!':
            return res.status(428).json({
              erro: true,
              message: 'Somente usuários podem se atribuir à atividades',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async doActivity(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const activityId = params.id

      const body = req.body
      const { realizationField }: DoActivityDto = body

      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const payload = jwt.decode(token)

        const { email } = payload as { email: string }

        const user = await this.userService.findUserByEmail(email)

        const activity = await this.activityService.findActivityById(
          Number(activityId),
        )

        if (!activity?.userId) {
          return res.status(428).json({
            erro: true,
            message:
              'Atividade deve estar atribuída a um usuário para ser finalizada',
          })
        }

        if (activity?.userId !== user.userId) {
          return res.status(403).json({
            erro: true,
            message: 'Somente o usuário atribuído à atividade pode finaliza-la',
          })
        }

        if (activity?.status === ActivityStatusEnum.DONE) {
          return res.status(409).json({
            erro: true,
            message: 'Atividade já finalizada',
          })
        }

        const doneActivity = await this.activityService.doActivity(
          Number(activity.activityId),
          user.userId,
          realizationField,
        )

        return res.status(200).json({
          message: 'Atividade realizada com sucesso!',
          doneActivity,
        })
      } else {
        throw new Error('Erro ao realizar atividade!')
      }
    } catch (error) {
      console.log('ActivityController.doActivity error', error)

      if (error instanceof Error) {
        switch (error.message) {
          case 'Usuário não encontrado!':
            return res.status(428).json({
              erro: true,
              message: 'Somente usuários podem finalizar atividades',
            })
          default:
            return res.status(500).json({
              erro: true,
              message: error.message,
            })
        }
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }
}

export { ActivityController }
