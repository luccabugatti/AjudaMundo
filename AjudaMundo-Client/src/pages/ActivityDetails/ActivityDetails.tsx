import { useContext, useEffect } from 'react'

import {
  Container,
  Form,
  FieldTitle,
  Input,
  TextArea,
  IconActivity,
} from './ActivityDetails.styles'

import ImageActivity from '../../assets/imgs/icon_atividade.png'
import { ActivityContext, AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'

export const ActivityDetails = (props: any) => {
  const { ong } = useContext(AuthContext)
  const { getActivityById } =
    useContext(ActivityContext)
  const { register, handleSubmit, setValue } = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  let activityId: number = Number(location.pathname.slice(-1))

  useEffect(() => {
    ;(async () => {
      const activityData = await getActivityById(Number(activityId))

      setValue('name', activityData.name)
      setValue('description', activityData.description)
      setValue('points', activityData.points)
      setValue('mainImg', activityData.mainImg)
    })()
  }, [])

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ name, description, points, mainImg }) => {})}
      >
        <IconActivity src={ImageActivity} />
        <FieldTitle>Nome da atividade</FieldTitle>
        <Input type={'text'} readOnly={true} {...register('name')} />
        <FieldTitle>Descrição da atividade</FieldTitle>
        <TextArea readOnly={true}{...register('description')} />
        <FieldTitle>Pontos da atividade</FieldTitle>
        <Input readOnly={true} type={'number'} {...register('points')} />
      </Form>
    </Container>
  )
}
