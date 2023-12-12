import { UpdateUserDto, CreateUserDto, LoginDto } from './dtos'
import { UserService } from './UserService'

import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

class UserController {
  constructor(private readonly userService: UserService) {}

  async findAllUsers(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const users = await this.userService.findAllUsers()

      return res.status(201).json({
        users,
      })
    } catch (error) {
      console.log('UserController.findAllUsers error', error)
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

  async updateUser(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: UpdateUserDto = req.body
      const { userId, user } = body

      const result = await this.userService.updateUser(userId, user)

      console.log(result)

      return res.status(204).json({
        userId,
      })
    } catch (error) {
      console.log('UserController.updateUser error', error)
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

  async createUser(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const body: CreateUserDto = req.body
      const { email, name, password, profileImg } = body

      const result = await this.userService.createUser({
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
      console.log('UserController.createUser error', error)
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

  async findUserById(
    req: Request,
    res: Response,
  ): Promise<Response<unknown, Record<string, unknown>>> {
    try {
      const params = req.params
      const userId = params.id

      const result = await this.userService.findUserById(Number(userId))

      console.log(result)

      return res.status(200).json({
        result,
      })
    } catch (error) {
      console.log('UserController.findUserById error', error)

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

      const token = await this.userService.login(email, password)

      const ONE_HOUR = 3600
      const THREE_HOURS = 10800

      const expirationDate = new Date(Date.now() - THREE_HOURS + ONE_HOUR)

      return res.status(200).json({
        token,
        expiresIn: expirationDate,
      })
    } catch (error) {
      console.log('UserController.login error', error)

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

  async getUserData(
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

        const user = await this.userService.findUserByEmail(email)

        return res.status(200).json({
          user,
        })
      } else {
        throw new Error('Token inválido')
      }
    } catch (error) {
      console.log('UserController.getUserData error', error)

      if (error instanceof Error) {
        return res.status(500).json({
          erro: true,
          message: 'Erro buscar usuário. Token inválido!',
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

export { UserController }
