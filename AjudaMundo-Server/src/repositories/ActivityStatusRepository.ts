import { AppDataSource } from '../data-source'
import { ActivityStatusEntity } from '../entities/ActivityStatus.entity'

export class ActivityStatusRepository {
  async getActivityStatusById(
    activityStatusId: number,
  ): Promise<ActivityStatusEntity | null> {
    try {
      console.log(
        `Iniciando consulta de status de atividades pelo id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const ActivityStatus = await activityStatusRepository.findOneBy({
        activityStatusId,
      })

      console.log(`Retorno da consulta: ${ActivityStatus}`)

      return ActivityStatus
    } catch (error) {
      console.log('Erro ao realizar consulta de status de atividades!', error)
      throw error
    }
  }

  async getActivityStatuss(): Promise<ActivityStatusEntity[] | null> {
    try {
      console.log('Iniciando consulta de status de atividades...')
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const ActivityStatuss = await activityStatusRepository.find()

      console.log(`Retorno da consulta: ${ActivityStatuss}`)

      return ActivityStatuss
    } catch (error) {
      console.log('Erro ao realizar consulta de status de atividades!', error)
      throw error
    }
  }

  // TODO: mover para DTO e tipar os dados
  async saveActivityStatus(name: any): Promise<any> {
    // TODO: encontrar tipagem para retorno
    try {
      console.log('Iniciando registro de novo status de atividades...')
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.save({
        name,
      })

      console.log(`Retorno da consulta: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar cadastro de status de atividades!', error)
      throw error
    }
  }

  async updateActivityStatus(
    activityStatusId: number,
    name: string,
  ): Promise<any> {
    // TODO: encontrar tipagem para retorno
    try {
      console.log(
        `Iniciando update de status de atividades com id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.save({
        activityStatusId,
        name,
      })

      console.log(`Retorno do update: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar update de status de atividades!', error)
      throw error
    }
  }

  // TODO: se possível arrumar tipagem do retorno desse método
  async deleteActivityStatus(activityStatusId: number): Promise<any> {
    try {
      console.log(
        `Iniciando exclusão de status de atividades pelo id: ${activityStatusId}...`,
      )
      const activityStatusRepository =
        AppDataSource.getRepository(ActivityStatusEntity)

      const response = await activityStatusRepository.delete({
        activityStatusId,
      })

      console.log(`Retorno da exclusão: ${response}`)

      return response
    } catch (error) {
      console.log('Erro ao realizar exclusão de status de atividades!', error)
      throw error
    }
  }
}
