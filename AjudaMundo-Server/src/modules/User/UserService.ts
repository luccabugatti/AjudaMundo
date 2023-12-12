import { UserType } from './interfaces'

import { UserRepository } from '../../repositories/UserRepository'
import { UserEntity } from '../../entities/User.entity'

import crypto from 'crypto'
import jwt from 'jsonwebtoken'

class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async findAllUsers(): Promise<UserEntity[]> {
    try {
      const users = await this.userRepository.getUsers()

      if (users) {
        return users
      } else {
        throw new Error('Erro ao consultar usuários')
      }
    } catch (error) {
      console.log('UserService.findAllUsers error', error)
      throw error
    }
  }

  async updateUser(userId: number, User: UserType): Promise<UserEntity> {
    try {
      const result = await this.userRepository.updateUser(userId, User)

      return result
    } catch (error) {
      console.log('UserService.updateUser error', error)
      throw error
    }
  }

  async createUser(user: UserType): Promise<UserEntity> {
    try {
      const formatedUser = {
        ...user,
        password: await this.encryptPassword(user.password),
      }

      console.log('Usuário criado com sucesso!')

      const result = await this.userRepository.saveUser(formatedUser)

      return result
    } catch (error) {
      console.log('UserService.createUser error', error)
      throw error
    }
  }

  async findUserById(userId: number): Promise<UserEntity> {
    try {
      const result = await this.userRepository.getUserById(userId)

      if (result) {
        return result
      } else {
        throw new Error('Usuário não encontrado!')
      }
    } catch (error) {
      console.log('UserService.findUserById error', error)
      throw error
    }
  }

  async findUserByEmail(email: string): Promise<UserEntity> {
    try {
      const result = await this.userRepository.getUserByEmail(email)

      if (result) {
        return result
      } else {
        throw new Error('Usuário não encontrado!')
      }
    } catch (error) {
      console.log('UserService.findUserByEmail error', error)
      throw error
    }
  }

  async login(email: string, password: string): Promise<string> {
    try {
      const user = await this.findUserByEmail(email)

      const verifiedPassword = await this.verifyPassword(
        password,
        user.password,
      )

      if (!verifiedPassword) {
        throw new Error('Erro ao se autenticar!')
      }

      const key = process.env.JSON_WEB_TOKEN_KEY

      let token: string

      if (key) {
        token = jwt.sign({ email: user.email }, key, { expiresIn: '1h' })
      } else {
        throw new Error('Erro ao se autenticar!')
      }

      return token
    } catch (error) {
      console.log('UserService.login error', error)
      throw error
    }
  }

  private async encryptPassword(password: string): Promise<string> {
    return new Promise((resolve, reject) => {
      const salt = crypto.randomBytes(16).toString('hex')

      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(salt + ':' + derivedKey.toString('hex'))
      })
    })
  }

  private async verifyPassword(
    password: string,
    hash: string,
  ): Promise<boolean> {
    return new Promise((resolve, reject) => {
      const [salt, key] = hash.split(':')
      crypto.scrypt(password, salt, 64, (err, derivedKey) => {
        if (err) reject(err)
        resolve(key === derivedKey.toString('hex'))
      })
    })
  }
}

export { UserService }
