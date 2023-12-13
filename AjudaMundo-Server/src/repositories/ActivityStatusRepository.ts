import { Logger } from 'winston'
import { AppDataSource } from '../data-source'
import { ActivityStatusEntity } from '../entities/ActivityStatus.entity'

export class ActivityStatusRepository {
  constructor(private readonly logger: Logger) {}

  async getActivityStatusById(
    activityStatusId: number,
  ): Promise<ActivityStatusEntity | null> {
    try {
      this.logger.debug(
        `Iniciando consulta de status de atividades pelo id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const ActivityStatus = await activityStatusRepository.findOneBy({
        activityStatusId,
      })

      this.logger.debug(`Retorno da consulta: ${ActivityStatus}`)

      return ActivityStatus
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de status de atividades!', error)
      throw error
    }
  }

  async getActivityStatuss(): Promise<ActivityStatusEntity[] | null> {
    try {
      this.logger.debug('Iniciando consulta de status de atividades...')
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const ActivityStatuss = await activityStatusRepository.find()

      this.logger.debug(`Retorno da consulta: ${ActivityStatuss}`)

      return ActivityStatuss
    } catch (error) {
      this.logger.debug('Erro ao realizar consulta de status de atividades!', error)
      throw error
    }
  }

  // TODO: mover para DTO e tipar os dados
  async saveActivityStatus(name: any): Promise<any> {
    // TODO: encontrar tipagem para retorno
    try {
      this.logger.debug('Iniciando registro de novo status de atividades...')
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.save({
        name,
      })

      this.logger.debug(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar cadastro de status de atividades!', error)
      throw error
    }
  }

  async updateActivityStatus(
    activityStatusId: number,
    name: string,
  ): Promise<any> {
    // TODO: encontrar tipagem para retorno
    try {
      this.logger.debug(
        `Iniciando update de status de atividades com id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.save({
        activityStatusId,
        name,
      })

      this.logger.debug(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar update de status de atividades!', error)
      throw error
    }
  }

  // TODO: se possível arrumar tipagem do retorno desse método
  async deleteActivityStatus(activityStatusId: number): Promise<any> {
    try {
      this.logger.debug(
        `Iniciando exclusão de status de atividades pelo id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.delete({
        activityStatusId,
      })

      this.logger.debug(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      this.logger.debug('Erro ao realizar exclusão de status de atividades!', error)
      throw error
    }
  }
}
