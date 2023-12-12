import { ActivityContext } from './ActivityContext'
import { useApi } from '../../hooks'
import {
  ActivityType,
  CreateActivityType,
  UpdateActivityType,
} from '../../types'

type ActivityProviderType = {
  children: JSX.Element
}

export const ActivityProvider = ({ children }: ActivityProviderType) => {
  const api = useApi()

  const getActivities = async (): Promise<ActivityType[]> => {
    try {
      const token = localStorage.getItem('access-token')

      if (token) {
        const { activities } = await api.getActivities(token)
        return activities
      } else {
        throw new Error('Falha na requisição axios!')
      }
    } catch (error) {
      console.log('Erro ao buscar atividades', error)
      throw error
    }
  }

  const getActivityById = async (activityId: number): Promise<ActivityType> => {
    try {
      const token = localStorage.getItem('access-token')

      if (token) {
        const { result } = await api.getActivityById(token, activityId)
        return result
      } else {
        throw new Error('Falha na requisição axios!')
      }
    } catch (error) {
      console.log('Erro ao buscar atividades', error)
      throw error
    }
  }

  const createActivity = async (
    fields: CreateActivityType,
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem('access-token')

      if (token) {
        const response = await api.createActivity(token, fields)
        if (response.result.activityId) {
          return true
        } else {
          throw new Error('Falha ao criar atividade!')
        }
      } else {
        throw new Error('Falha na requisição axios!')
      }
    } catch (error) {
      console.log('Erro ao criar atividade', error)
      throw error
    }
  }

  const updateActivity = async (
    fields: UpdateActivityType,
  ): Promise<boolean> => {
    try {
      const token = localStorage.getItem('access-token')

      if (token) {
        const response = await api.updateActivity(token, fields)
        if (response) {
          return true
        } else {
          throw new Error('Falha ao editar atividade!')
        }
      } else {
        throw new Error('Falha na requisição axios!')
      }
    } catch (error) {
      console.log('Erro ao editar atividade', error)
      throw error
    }
  }

  const deleteActivity = async (activityId: number): Promise<boolean> => {
    try {
      const token = localStorage.getItem('access-token')

      if (token) {
        const response = await api.deleteActivity(token, activityId)
        if (response) {
          return true
        } else {
          throw new Error('Falha ao deletar atividade!')
        }
      } else {
        throw new Error('Falha na requisição axios!')
      }
    } catch (error) {
      console.log('Erro ao deletar atividade', error)
      throw error
    }
  }

  return (
    <ActivityContext.Provider
      value={{
        getActivities,
        getActivityById,
        createActivity,
        updateActivity,
        deleteActivity,
      }}
    >
      {children}
    </ActivityContext.Provider>
  )
}
