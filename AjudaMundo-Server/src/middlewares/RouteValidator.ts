/* eslint-disable  @typescript-eslint/no-explicit-any */
import { transformAndValidate } from 'class-transformer-validator'
import { Request, Response, NextFunction } from 'express'

const isProd = process.env.NODE_ENV === 'production'

function makeValidateBody<T>(
  c: T,
  whitelist = true,
  errorHandler?: (
    err: any,
    req: Request,
    res: Response,
    next: NextFunction,
  ) => void,
) {
  return function ExpressClassValidate(
    req: Request,
    res: Response,
    next: NextFunction,
  ) {
    const toValidate = req.body
    if (!toValidate) {
      if (errorHandler) {
        errorHandler({ type: 'no-body' }, req, res, next)
      } else {
        res.status(400).json({
          error: true,
          message: 'Validation failed',
          ...(isProd
            ? {}
            : { originalError: { message: 'No request body found' } }),
        })
      }
    } else {
      transformAndValidate(c as any, toValidate, { validator: { whitelist } })
        .then((transformed) => {
          req.body = transformed
          next()
        })
        .catch((err) => {
          if (errorHandler) {
            errorHandler(err, req, res, next)
          } else {
            const errors: any[] = []
            err.forEach((e: any) => {
              errors.push({ parameter: e.property, messages: e.constraints })
            })
            res.status(400).json({
              error: true,
              message: 'Validation failed',
              ...(isProd ? {} : { originalError: errors }),
            })
          }
        })
    }
  }
}

export { makeValidateBody }
