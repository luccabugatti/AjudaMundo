import { ReactNode, ComponentProps, useContext } from 'react'

import {
  Container,
  WrapperActivityImage,
  WrapperActivityName,
  LabelActivityName,
  AssignButton,
  FinishButton,
  WrapperFinishedActivity,
  LabelFinishedActivity,
} from './ActivityCard.styles'
import { ActivityType } from '../../types'

import { useNavigate } from 'react-router-dom'
import { ActivityContext, AuthContext } from '../../contexts'

interface ActivityCardProps extends ComponentProps<any> {
  activity: ActivityType
}

export const ActivityCard = ({ activity }: ActivityCardProps) => {
  const navigate = useNavigate()
  const { ong, user, signOut } = useContext(AuthContext)
  const { assignToActivity, doActivity } = useContext(ActivityContext)
  const defaultImage = 'https://cdn-icons-png.flaticon.com/512/2686/2686222.png'

  const checkAssignButtonCondition = () => {
    if (activity.status != 0) {
      return false
    }

    if (ong) {
      return false
    }

    return true
  }

  const checkFinishButtonCondition = () => {
    if (activity.status != 1) {
      return false
    }

    if (ong) {
      return false
    }

    return true
  }

  const editActivity = () => {
    if(ong && activity.status == 0) return navigate(`/editar-atividade/${activity.activityId}`)

    return navigate(`/detalhes-atividade/${activity.activityId}`)
  }

  const handleAssignToActivity = async () => {
    if(!user) return signOut();
    
    await assignToActivity(activity.activityId)
    navigate('/home-user')
  }

  const handleDoActivity = async () => {
    if(!user) return signOut();

    await doActivity(activity.activityId)
    navigate('/todas-atividades')
  }

  return (
    <Container activity={activity} isOng={ong ? true : false}>
      <WrapperActivityImage
        onClick={editActivity}
        style={{
          backgroundImage: `url(${
            activity.mainImg ? activity.mainImg : defaultImage
          })`,
        }}
      />
      <WrapperActivityName>
        <LabelActivityName>{activity.name}</LabelActivityName>
      </WrapperActivityName>
      { (activity.status == 0 && !user) && <WrapperFinishedActivity activity={activity}>
        <LabelFinishedActivity>Atividade ainda não atribuída</LabelFinishedActivity>
      </WrapperFinishedActivity> }
      { (activity.status == 1 && !user) && <WrapperFinishedActivity activity={activity}>
        <LabelFinishedActivity>Atividade já atribuída</LabelFinishedActivity>
      </WrapperFinishedActivity> }
      { activity.status == 2 && <WrapperFinishedActivity activity={activity}>
        <LabelFinishedActivity>Atividade finalizada</LabelFinishedActivity>
      </WrapperFinishedActivity> }
      { checkAssignButtonCondition() && <AssignButton activity={activity} onClick={() => handleAssignToActivity()}>Pegar atividade</AssignButton>}
      { checkFinishButtonCondition() && <FinishButton activity={activity} onClick={() => handleDoActivity()}>Finalizar atividade</FinishButton>}
    </Container>
  )
}
