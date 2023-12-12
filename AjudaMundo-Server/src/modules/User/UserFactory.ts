import { UserRepository } from '../../repositories/UserRepository'
import { UserController } from './UserController'
import { UserService } from './UserService'

export const UserFactory = (): UserController => {
  const userRepository = new UserRepository()
  const userService = new UserService(userRepository)
  const userController = new UserController(userService)

  return userController
}
