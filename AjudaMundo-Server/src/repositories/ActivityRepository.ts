import { Logger } from 'winston'
import { AppDataSource } from '../data-source'
import { ActivityEntity } from '../entities/Activity.entity'
import { ActivityType } from '../modules/Activity'

import { DeleteResult } from 'typeorm'

export class ActivityRepository {
  constructor(private readonly logger: Logger) { }

  async getActivityById(activityId: number): Promise<ActivityEntity | null> {
    try {
      this.logger.debug(`Iniciando consulta de atividade pelo id: ${activityId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activity = await activyRepository.findOneBy({ activityId })

      this.logger.debug(`Retorno da consulta: ${activity}`)

      return activity
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de atividade!', error)
      throw error
    }
  }

  async getActivities(): Promise<ActivityEntity[] | null> {
    try {
      this.logger.debug('Iniciando consulta de atividades...')
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activities = await activyRepository.find()

      this.logger.debug(`Retorno da consulta: ${activities}`)

      return activities
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de atividades!', error)
      throw error
    }
  }

  async getOngActivities(ongId: number): Promise<ActivityEntity[] | null> {
    try {
      this.logger.debug(`Iniciando consulta de atividades da ong ${ongId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const activities = await activyRepository.find({
        where: {
          ongId,
        },
      })

      this.logger.debug(`Retorno da consulta: ${activities}`)

      return activities
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de atividades da ong!', error)
      throw error
    }
  }

  async saveActivity(activity: ActivityType): Promise<ActivityEntity> {
    try {
      this.logger.debug('Iniciando registro de nova atividade...')
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.save(activity)

      this.logger.debug(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar cadastro de atividade!', error)
      throw error
    }
  }

  async updateActivity(
    activityId: number,
    activity: Partial<ActivityType>,
  ): Promise<ActivityEntity> {
    try {
      this.logger.debug(`Iniciando update de atividade com id: ${activityId}...`)
      this.logger.debug('Dados do update', activity)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.save({
        activityId,
        ...activity,
      })

      this.logger.debug(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar update de atividade!', error)
      throw error
    }
  }

  async deleteActivity(activityId: number): Promise<DeleteResult> {
    try {
      this.logger.debug(`Iniciando exclusão de atividade pelo id: ${activityId}...`)
      const activyRepository = AppDataSource.getRepository(ActivityEntity)

      const response = await activyRepository.delete({ activityId })

      this.logger.debug(`Retorno da exclusão`)
      this.logger.debug(response)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar exclusão de atividade!', error)
      throw error
    }
  }
}
