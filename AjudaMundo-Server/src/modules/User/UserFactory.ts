import { UserRepository } from '../../repositories/UserRepository'
import { UserController } from './UserController'
import { UserService } from './UserService'
import { createLogger, transports } from "winston"

export const UserFactory = (): UserController => {
  const logger = createLogger({
    transports: [
      new transports.Console(),
      new transports.File({ filename: 'logs/user.log' })
    ]
  })

  const userRepository = new UserRepository(logger)
  const userService = new UserService(userRepository, logger)
  const userController = new UserController(userService)

  return userController
}
