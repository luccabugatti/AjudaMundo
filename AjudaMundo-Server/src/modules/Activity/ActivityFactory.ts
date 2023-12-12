import { ActivityRepository } from '../../repositories/ActivityRepository'
import { ActivityController } from './ActivityController'
import { ActivityService } from './ActivityService'

import { UserService } from '../User'
import { OngService } from '../Ong'
import { UserRepository } from '../../repositories/UserRepository'
import { OngRepository } from '../../repositories/OngRepository'

export const ActivityFactory = (): ActivityController => {
  const activityRepository = new ActivityRepository()
  const userRepository = new UserRepository()
  const ongRepository = new OngRepository()
  const activityService = new ActivityService(activityRepository)
  const userService = new UserService(userRepository)
  const ongService = new OngService(ongRepository)
  const activityController = new ActivityController(
    activityService,
    userService,
    ongService,
  )

  return activityController
}
