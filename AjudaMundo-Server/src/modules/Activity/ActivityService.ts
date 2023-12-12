import { ActivityType } from './interfaces'

import { ActivityRepository } from '../../repositories/ActivityRepository'
import { ActivityEntity } from '../../entities/Activity.entity'

class ActivityService {
  constructor(private readonly activityRepository: ActivityRepository) {}

  async findAllActivities(): Promise<ActivityEntity[]> {
    try {
      const activities = await this.activityRepository.getActivities()

      if (activities) {
        return activities
      } else {
        throw new Error('Erro ao consultar atividades')
      }
    } catch (error) {
      console.log('ActivityService.findAllActivities error', error)
      throw error
    }
  }

  async getOngActivities(ongId: number): Promise<ActivityEntity[]> {
    try {
      const activities = await this.activityRepository.getOngActivities(ongId)

      if (activities) {
        return activities
      } else {
        throw new Error('Erro ao consultar atividades da ong')
      }
    } catch (error) {
      console.log('ActivityService.getOngActivities error', error)
      throw error
    }
  }

  async updateActivity(
    activityId: number,
    ongId: number,
    activity: Partial<ActivityType>,
  ): Promise<ActivityEntity> {
    try {
      const activityData = await this.activityRepository.getActivityById(
        activityId,
      )

      if (activityData?.ongId !== ongId) {
        throw new Error('Somente a ong que criou a atividade que pode editá-la')
      }

      const result = await this.activityRepository.updateActivity(
        activityId,
        activity,
      )

      return result
    } catch (error) {
      console.log('ActivityService.updateActivity error', error)
      throw error
    }
  }

  async createActivity(activity: ActivityType): Promise<ActivityEntity> {
    try {
      const result = await this.activityRepository.saveActivity(activity)

      return result
    } catch (error) {
      console.log('ActivityService.createActivity error', error)
      throw error
    }
  }

  async findActivityById(activityId: number): Promise<ActivityEntity> {
    try {
      const result = await this.activityRepository.getActivityById(activityId)

      if (result) {
        return result
      } else {
        throw new Error('Atividade não encontrado!')
      }
    } catch (error) {
      console.log('ActivityService.findActivityById error', error)
      throw error
    }
  }

  async deleteActivityById(
    activityId: number,
    ongId: number,
  ): Promise<boolean> {
    try {
      const activityData = await this.activityRepository.getActivityById(
        activityId,
      )

      if (activityData?.ongId !== ongId) {
        throw new Error(
          'Somente a ong que criou a atividade que pode deleta-la',
        )
      }

      const result = await this.activityRepository.deleteActivity(activityId)

      if (result.affected !== 0) {
        return true
      } else {
        throw new Error('Atividade não existe!')
      }
    } catch (error) {
      console.log('ActivityService.deleteActivityById error', error)
      throw error
    }
  }

  async assingToActivity(
    activityId: number,
    userId: number,
  ): Promise<ActivityEntity> {
    try {
      console.log(
        `Atribuindo atividade ${activityId} ao usuário de id: ${userId}...`,
      )

      const result = await this.activityRepository.updateActivity(activityId, {
        userId,
        status: 1,
      })

      console.log(
        `Atividade ${activityId} ao usuário de id: ${userId} com sucesso!`,
      )

      return result
    } catch (error) {
      console.log('ActivityService.assingToActivity error', error)
      throw error
    }
  }

  async doActivity(
    activiyId: number,
    userId: number,
    realizationField: string,
  ): Promise<boolean> {
    try {
      const activity = await this.activityRepository.getActivityById(activiyId)

      if (activity?.userId === userId) {
        await this.activityRepository.updateActivity(activiyId, {
          status: 2,
          realizationField,
        })
      }

      return true
    } catch (error) {
      console.log('ActivityService.doActivity error', error)
      throw error
    }
  }
}

export { ActivityService }
