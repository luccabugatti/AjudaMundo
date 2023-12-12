import { useContext, useEffect, useState } from 'react'

import {
  Container,
  Form,
  FieldTitle,
  Input,
  TextArea,
  Button,
  IconActivity,
} from './EditActivity.styles'

import ImageActivity from '../../assets/imgs/icon_atividade.png'
import { ActivityContext, AuthContext } from '../../contexts'
import { ActivityType } from '../../types'

import { useForm } from 'react-hook-form'
import { useNavigate, useLocation } from 'react-router-dom'

export const EditActivity = (props: any) => {
  const { ong, signOut } = useContext(AuthContext)
  const { updateActivity, deleteActivity, getActivityById } =
    useContext(ActivityContext)
  const { register, handleSubmit, setValue } = useForm()

  const navigate = useNavigate()
  const location = useLocation()

  let activityId: number = Number(location.pathname.slice(-1))

  const handleEditActivity = async (
    name: string,
    description: string,
    points: number,
    mainImg: string,
  ) => {
    if (!ong?.ongId) {
      signOut()
    } else {
      const { ongId } = ong
      const Editd = await updateActivity({
        activityId,
        name,
        description,
        points,
        ongId,
        mainImg,
      })

      if (Editd) {
        navigate('/home')
      } else {
        window.alert('Erro ao atualizar atividade!')
      }
    }
  }

  const handleDeleteActivity = async () => {
    if (!ong?.ongId) {
      signOut()
    } else {
      const deleted = await deleteActivity(activityId)

      console.log('teste', deleted)

      if (deleted) {
        navigate('/home')
      } else {
        window.alert('Erro ao deletar atividade!')
      }
    }
  }

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
        onSubmit={handleSubmit(({ name, description, points, mainImg }) => {
          handleEditActivity(name!, description!, points!, mainImg!)
        })}
      >
        <IconActivity src={ImageActivity} />
        <FieldTitle>Nome da atividade</FieldTitle>
        <Input type={'text'} {...register('name')} />
        <FieldTitle>Descrição da atividade</FieldTitle>
        <TextArea {...register('description')} />
        <FieldTitle>Pontos da atividade</FieldTitle>
        <Input type={'number'} {...register('points')} />
        <FieldTitle>Url para imagem da atividade</FieldTitle>

        <Input
          type={'text'}
          {...register('mainImg')}
          style={{ marginBottom: 0 }}
        />

        <Button type="submit">Editar atividade</Button>
        <Button
          style={{ backgroundColor: '#F05D3E', marginTop: '1rem' }}
          type={'button'}
          onClick={() => handleDeleteActivity()}
        >
          Deletar atividade
        </Button>
      </Form>
    </Container>
  )
}
