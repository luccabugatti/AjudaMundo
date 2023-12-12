export type UpdateActivityType = {
  activityId: number
  name: string
  points: number
  description: string
  mainImg?: string
  ongId: number
}

export type CreateActivityType = {
  name: string
  points: number
  description: string
  mainImg?: string
  ongId: number
}

export type ActivityType = {
  name: string
  points: number
  description: string
  mainImg: string
  status: number
  ongId: number
  userId: number | null
  realizationField: string | null
  activityId: number
  createdAt: string
  updatedAt: string
}
