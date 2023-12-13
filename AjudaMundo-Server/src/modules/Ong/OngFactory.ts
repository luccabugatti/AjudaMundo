import { createLogger, transports } from 'winston'
import { OngRepository } from '../../repositories/OngRepository'
import { OngController } from './OngController'
import { OngService } from './OngService'

export const OngFactory = (): OngController => {
  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/ong.log' })
    ]
  })

  const ongRepository = new OngRepository(logger)
  const ongService = new OngService(ongRepository, logger)
  const ongController = new OngController(ongService)

  return ongController
}
