import { Request, Response, NextFunction } from 'express'

import jwt from 'jsonwebtoken'

export const validateToken = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    const headers = req.headers
    const authorizationHeader = headers.authorization
    const token = authorizationHeader?.split(' ')[1]
    const key = process.env.JSON_WEB_TOKEN_KEY

    if (token && key) {
      jwt.verify(token, key, (err) => {
        if (err) {
          console.log(err)
          throw new Error('Token inválido')
        }
      })

      next()
    } else {
      throw new Error('É necessário passar o token')
    }
  } catch (error) {
    if (error instanceof Error) {
      res.status(401).json({
        erro: true,
        message: error.message,
      })
    } else {
      res.status(401).json({
        erro: true,
        message: 'Erro não mapeado',
      })
    }
  }
}
