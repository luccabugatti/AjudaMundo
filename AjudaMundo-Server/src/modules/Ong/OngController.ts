import { UpdateOngDto, CreateOngDto, LoginDto } from './dtos'
import { OngService } from './OngService'

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class OngController {
  constructor(private readonly OngService: OngService) {}

  async findAllOngs(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const ongs = await this.OngService.findAllOngs()

      return res.status(201).json({
        ongs,
      })
    } catch (error) {
      console.log('OngController.findAllOngs error', error)
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

  async updateOng(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: UpdateOngDto = req.body
      const { ongId, ong } = body

      const result = await this.OngService.updateOng(ongId, ong)

      console.log(result)

      return res.status(204).json({
        ongId,
      })
    } catch (error) {
      console.log('OngController.updateOng error', error)
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

  async createOng(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: CreateOngDto = req.body
      const { email, name, password, profileImg } = body

      const result = await this.OngService.createOng({
        email,
        name,
        password,
        profileImg,
      })

      console.log(result)

      return res.status(200).json({
        result,
      })
    } catch (error) {
      console.log('OngController.createOng error', error)
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

  async findOngById(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const ongId = params.id

      const result = await this.OngService.findOngById(Number(ongId))

      console.log(result)

      return res.status(200).json({
        result,
      })
    } catch (error) {
      console.log('OngController.findOngById error', error)

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

  async login(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: LoginDto = req.body
      const { email, password } = body

      const token = await this.OngService.login(email, password)

      const ONE_HOUR = 3600
      const THREE_HOURS = 10800

      const expirationDate = new Date(Date.now() - THREE_HOURS + ONE_HOUR)

      return res.status(200).json({
        token,
        expiresIn: expirationDate,
      })
    } catch (error) {
      console.log('OngController.login error', error)

      if (error instanceof Error) {
        return res.status(401).json({
          erro: true,
          message: 'Erro ao realizar login',
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }

  async getOngData(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const headers = req.headers
      const authorizationHeader = headers.authorization
      const token = authorizationHeader?.split(' ')[1]

      if (token) {
        const key = process.env.JSON_WEB_TOKEN_KEY

        if (key) {
          jwt.verify(token, key)
        } else {
          throw new Error(
            'Não foi possível validar token. Erro com variáveis de ambiente do servidor!',
          )
        }

        const payload = jwt.decode(token)

        const { email } = payload as { email: string }

        const ong = await this.OngService.findOngByEmail(email)

        return res.status(200).json({
          ong,
        })
      } else {
        throw new Error('Token inválido')
      }
    } catch (error) {
      console.log('OngController.getOngData error', error)

      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: 'Erro buscar ong. Token inválido!',
        })
      } else {
        return res.status(500).json({
          erro: true,
          message: 'Erro não mapeado',
        })
      }
    }
  }
}

export { OngController }
