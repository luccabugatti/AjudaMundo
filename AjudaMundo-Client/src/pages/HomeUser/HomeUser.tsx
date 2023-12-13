import { ReactNode, useContext, useEffect, useState } from 'react'

import {
  Container,
  WrapperLeft,
  WrapperActivities,
  LabelNoActivities,
  WrapperInformation,
  LabelInformation,
  Indicator,
  IconHero,
} from './HomeUser.styles'
import ImageHero from '../../assets/imgs/icon_heroi.png'
import { ActivityCard } from '../../components'
import { ActivityContext } from '../../contexts'

import { ActivityType } from '../../types/activity'

interface HomeProps {
  children?: ReactNode
}

export const HomeUser = ({ children }: HomeProps) => {
  const [activities, setActivities] = useState<ActivityType[] | []>([])
  const { getActivities } = useContext(ActivityContext)

  useEffect(() => {
    ;(async () => {
      const activities = await getActivities()

      setActivities(activities)
    })()
  }, [])
  return (
    <Container>
      <WrapperLeft>
        <Indicator>Atividades disponiveis</Indicator>
        {activities.length > 0 ? (
          <WrapperActivities>
            {activities.map((activity, index) => (
              <ActivityCard key={index} activity={activity} />
            ))}
          </WrapperActivities>
        ) : (
          <LabelNoActivities>Nenhuma atividade cadastrada</LabelNoActivities>
        )}
      </WrapperLeft>
      <WrapperInformation>
        <LabelInformation>
          O AjudaMundo Nasceu com o espírito de ajudar o próximo e fazer a
          diferença na sociedade! Empatia, amizade, colaboração e criatividade
          são as palavras que representam nosso time, quer você fazer a
          diferença também? Se junte ao AjudaMundo!
        </LabelInformation>
        <IconHero src={ImageHero} />
      </WrapperInformation>
    </Container>
  )
}
