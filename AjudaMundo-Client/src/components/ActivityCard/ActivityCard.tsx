import { ReactNode, ComponentProps } from 'react'

import {
  Container,
  WrapperActivityImage,
  WrapperActivityName,
  LabelActivityName,
} from './ActivityCard.styles'
import { ActivityType } from '../../types'

import { useNavigate } from 'react-router-dom'

interface ActivityCardProps extends ComponentProps<any> {
  activity: ActivityType
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const navigate = useNavigate()
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/2686/2686222.png'
  return (
    <Container>
      <WrapperActivityImage
        onClick={() => navigate(`/editar-atividade/${activity.activityId}`)}
        style={{
          backgroundImage: `url(${
            activity.mainImg ? activity.mainImg : defaultImage
          })`,
        }}
      />
      <WrapperActivityName>
        <LabelActivityName>{activity.name}</LabelActivityName>
      </WrapperActivityName>
    </Container>
  )
}
