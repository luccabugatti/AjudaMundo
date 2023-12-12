import { createContext } from 'react'
import {
  ActivityType,
  CreateActivityType,
  UpdateActivityType,
} from '../../types'

export type ActivityContextType = {
  getActivities: () => Promise<ActivityType[]>
  getActivityById: (activityId: number) => Promise<ActivityType>
  createActivity: (fields: CreateActivityType) => Promise<boolean>
  updateActivity: (fields: UpdateActivityType) => Promise<boolean>
  deleteActivity: (activityId: number) => Promise<boolean>
}

export const ActivityContext = createContext<ActivityContextType>(null!)
