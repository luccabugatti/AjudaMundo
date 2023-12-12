import { AppDataSource } from '../data-source'
import { ActivityEntity } from '../entities/Activity.entity'
import { ActivityType } from '../modules/Activity'

import { DeleteResult } from 'typeorm'

export class ActivityRepository {
  async getActivityById(activityId: number): Promise<ActivityEntity | null> {
    try {
      console.log(`Iniciando consulta de atividade pelo id: ${activityId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activity = await activyRepository.findOneBy({ activityId })

      console.log(`Retorno da consulta: ${activity}`)

      return activity
    } catch (error) {
      console.log('Erro ao realizar consulta de atividade!', error)
      throw error
    }
  }

  async getActivities(): Promise<ActivityEntity[] | null> {
    try {
      console.log('Iniciando consulta de atividades...')
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activities = await activyRepository.find()

      console.log(`Retorno da consulta: ${activities}`)

      return activities
    } catch (error) {
      console.log('Erro ao realizar consulta de atividades!', error)
      throw error
    }
  }

  async getOngActivities(ongId: number): Promise<ActivityEntity[] | null> {
    try {
      console.log(`Iniciando consulta de atividades da ong ${ongId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activities = await activyRepository.find({
        where: {
          ongId,
        },
      })

      console.log(`Retorno da consulta: ${activities}`)

      return activities
    } catch (error) {
      console.log('Erro ao realizar consulta de atividades da ong!', error)
      throw error
    }
  }

  async saveActivity(activity: ActivityType): Promise<ActivityEntity> {
    try {
      console.log('Iniciando registro de nova atividade...')
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.save(activity)

      console.log(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar cadastro de atividade!', error)
      throw error
    }
  }

  async updateActivity(
    activityId: number,
    activity: Partial<ActivityType>,
  ): Promise<ActivityEntity> {
    try {
      console.log(`Iniciando update de atividade com id: ${activityId}...`)
      console.log('Dados do update', activity)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.save({
        activityId,
        ...activity,
      })

      console.log(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar update de atividade!', error)
      throw error
    }
  }

  async deleteActivity(activityId: number): Promise<DeleteResult> {
    try {
      console.log(`Iniciando exclusão de atividade pelo id: ${activityId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.delete({ activityId })

      console.log(`Retorno da exclusão`)
      console.log(response)

      return response
    } catch (error) {
      console.log('Erro ao realizar exclusão de atividade!', error)
      throw error
    }
  }
}
