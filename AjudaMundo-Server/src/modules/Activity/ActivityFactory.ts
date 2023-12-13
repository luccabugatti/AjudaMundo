import { ActivityRepository } from '../../repositories/ActivityRepository'
import { ActivityController } from './ActivityController'
import { ActivityService } from './ActivityService'

import { UserService } from '../User'
import { OngService } from '../Ong'
import { UserRepository } from '../../repositories/UserRepository'
import { OngRepository } from '../../repositories/OngRepository'
import { createLogger, transports } from 'winston'

export const ActivityFactory = (): ActivityController => {
  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/activity.log' })
    ]
  })

  const activityRepository = new ActivityRepository(logger)
  const userRepository = new UserRepository(logger)
  const ongRepository = new OngRepository(logger)
  const activityService = new ActivityService(activityRepository, logger)
  const userService = new UserService(userRepository, logger)
  const ongService = new OngService(ongRepository, logger)
  const activityController = new ActivityController(
    activityService,
    userService,
    ongService,
  )

  return activityController
}
