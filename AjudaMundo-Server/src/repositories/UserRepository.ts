import { AppDataSource } from '../data-source'
import { UserEntity } from '../entities'
import { UserType } from '../modules/User/interfaces'

import { DeleteResult } from 'typeorm'

export class UserRepository {
  async getUserById(userId: number): Promise<UserEntity | null> {
    try {
      console.log(`Iniciando consulta de usuario pelo id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const user = await userRepository.findOneBy({ userId })

      console.log(`Retorno da consulta: ${user}`)

      return user
    } catch (error) {
      console.log('Erro ao realizar consulta de usuario!', error)
      throw error
    }
  }

  async getUserByEmail(email: string): Promise<UserEntity | null> {
    try {
      console.log(`Iniciando consulta de usuario pelo email: ${email}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const user = await userRepository.findOneBy({ email })

      console.log(`Retorno da consulta: ${user}`)

      return user
    } catch (error) {
      console.log('Erro ao realizar consulta de usuario!', error)
      throw error
    }
  }

  async getUsers(): Promise<UserEntity[] | null> {
    try {
      console.log('Iniciando consulta de usuarios...')
      const userRepository = AppDataSource.getRepository(UserEntity)

      const users = await userRepository.find()

      console.log(`Retorno da consulta: ${users}`)

      return users
    } catch (error) {
      console.log('Erro ao realizar consulta de usuarios!', error)
      throw error
    }
  }

  async saveUser(user: UserType): Promise<UserEntity> {
    try {
      console.log('Iniciando registro de novo usuario...')
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.save(user)

      console.log(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar cadastro de usuario!', error)
      throw error
    }
  }

  async updateUser(userId: number, user: UserType): Promise<UserEntity> {
    try {
      console.log(`Iniciando update de usuario com id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.save({
        userId,
        ...user,
      })

      console.log(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar update de usuario!', error)
      throw error
    }
  }

  async deleteUser(userId: number): Promise<DeleteResult> {
    try {
      console.log(`Iniciando exclusão de usuario pelo id: ${userId}...`)
      const userRepository = AppDataSource.getRepository(UserEntity)

      const response = await userRepository.delete({ userId })

      console.log(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar exclusão de usuario!', error)
      throw error
    }
  }
}
