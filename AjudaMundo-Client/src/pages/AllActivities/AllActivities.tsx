import { ReactNode, useContext, useEffect, useState } from 'react'

import {
  Container,
  Wrapper,
  WrapperActivities,
  LabelNoActivities,
  Indicator,
} from './AllActivities.styles'
import { ActivityCard } from '../../components'
import { ActivityContext } from '../../contexts'

import { ActivityType } from '../../types/activity'

interface HomeProps {
  children?: ReactNode
}

export const AllActivities = ({ children }: HomeProps) => {
  const [activities, setActivities] = useState<ActivityType[] | []>([])
  const { getActivities } = useContext(ActivityContext)

  useEffect(() => {
    ;(async () => {
      const activities = await getActivities()
      const avialableActivities = activities.filter(activity => activity.status == 0)

      setActivities(avialableActivities)
    })()
  }, [])

  console.log(activities.length)
  return (
    <Container>
      <Wrapper>
        <Indicator>Atividades disponiveis</Indicator>
        {activities.length > 0 && (
          <WrapperActivities>
            {activities.map((activity, index) => (
              activity.status == 0 && <ActivityCard key={index} activity={activity} />
            ))}
          </WrapperActivities>
        )}
        {activities.length == 0 && (
          <LabelNoActivities>Nenhuma atividade disponível</LabelNoActivities>
        )}
      </Wrapper>
    </Container>
  )
}
