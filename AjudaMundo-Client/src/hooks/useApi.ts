import axios from 'axios'
import { CreateActivityType, UpdateActivityType } from '../types/activity'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
})

export const useApi = () => ({
  validateToken: async (token: string) => {},

  signInOng: async (email: string, password: string) => {
    const response = await api.post('/ong/login', { email, password })
    return response.data
  },

  signInUser: async (email: string, password: string) => {
    const response = await api.post('/user/login', { email, password })
    return response.data
  },
  
  getOngData: async (token: string) => {
    const response = await api.get('/ong/login/get-ong', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },

  getUserData: async (token: string) => {
    const response = await api.get('/user/login/get-user', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })

    return response.data
  },

  signUpOng: async (ongName: string, email: string, password: string) => {
    const response = await api.post('/ong', { name: ongName, email, password })

    return response.data
  },

  signUpUser: async (userName: string, email: string, password: string) => {
    const response = await api.post('/user', { name: userName, email, password })

    return response.data
  },

  getActivities: async (token: string) => {
    const response = await api.get('/activity', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  },

  getUserActivities: async (token: string) => {
    const response = await api.get('/activity/user-activities', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  },

  getOngActivities: async (token: string) => {
    const response = await api.get('/activity/ong-activities', {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  },

  getActivityById: async (token: string, activityId: number) => {
    const response = await api.get(`/activity/${activityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    return response.data
  },

  createActivity: async (token: string, fields: CreateActivityType) => {
    const { name, description, points, ongId, mainImg } = fields
    const response = await api.post(
      '/activity',
      {
        name,
        points: Number(points),
        description,
        ongId,
        mainImg,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  },

  updateActivity: async (token: string, fields: UpdateActivityType) => {
    const { activityId, name, description, points, ongId, mainImg } = fields

    const response = await api.patch(
      `/activity/${activityId}`,
      {
        name,
        points: Number(points),
        description,
        ongId,
        mainImg,
      },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    if (response.status !== 200) {
      throw new Error('Erro ao editar atividade')
    }

    return true
  },

  deleteActivity: async (token: string, activityId: number) => {
    const response = await api.delete(`/activity/${activityId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })

    if (response.status !== 204) {
      throw new Error('Erro ao editar atividade')
    }

    return true
  },

  assignToActivity: async (token: string, activityId: number) => {
    const response = await api.post(
      `/activity/assign/${activityId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  },

  doActivity: async (token: string, activityId: number) => {
    const response = await api.post(
      `/activity/do/${activityId}`,
      {},
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    )

    return response.data
  }
})
