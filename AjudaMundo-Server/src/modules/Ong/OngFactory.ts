import { OngRepository } from '../../repositories/OngRepository'
import { OngController } from './OngController'
import { OngService } from './OngService'

export const OngFactory = (): OngController => {
  const ongRepository = new OngRepository()
  const ongService = new OngService(ongRepository)
  const ongController = new OngController(ongService)

  return ongController
}
