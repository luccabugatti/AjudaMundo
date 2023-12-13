import { Logger } from 'winston'
import { AppDataSource } from '../data-source'
import { UserEntity } from '../entities'
import { UserType } from '../modules/User/interfaces'

import { DeleteResult } from 'typeorm'

export class UserRepository {
  constructor(private readonly logger: Logger) {}

  async getUserById(userId: number): Promise<UserEntity | null> {
    try {
      this.logger.debug(`Iniciando consulta de usuario pelo id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const user = await userRepository.findOneBy({ userId })

      this.logger.debug(`Retorno da consulta: ${user}`)

      return user
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de usuario!', error)
      throw error
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      this.logger.debug(`Iniciando consulta de usuario pelo email: ${email}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const user = await userRepository.findOneBy({ email })

      this.logger.debug(`Retorno da consulta: ${user}`)

      return user
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de usuario!', error)
      throw error
    }
  }

  async getUsers(): Promise<UserEntity[] | null> {
    try {
      this.logger.debug('Iniciando consulta de usuarios...')
      const userRepository = AppDataSource.getRepository(UserEntity)

      const users = await userRepository.find()

      this.logger.debug(`Retorno da consulta: ${users}`)

      return users
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de usuarios!', error)
      throw error
    }
  }

  async saveUser(user: UserType): Promise<UserEntity> {
    try {
      this.logger.debug('Iniciando registro de novo usuario...')
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.save(user)

      this.logger.debug(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar cadastro de usuario!', error)
      throw error
    }
  }

  async updateUser(userId: number, user: UserType): Promise<UserEntity> {
    try {
      this.logger.debug(`Iniciando update de usuario com id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.save({
        userId,
        ...user,
      })

      this.logger.debug(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar update de usuario!', error)
      throw error
    }
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    try {
      this.logger.debug(`Iniciando exclusão de usuario pelo id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.delete({ userId })

      this.logger.debug(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar exclusão de usuario!', error)
      throw error
    }
  }
}
