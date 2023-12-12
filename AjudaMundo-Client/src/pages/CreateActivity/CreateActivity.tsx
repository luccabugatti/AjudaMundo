import { ReactNode, useContext } from 'react'

import {
  Container,
  Form,
  FieldTitle,
  Input,
  TextArea,
  Button,
  IconActivity,
} from './CreateActivity.styles'
import ImageActivity from '../../assets/imgs/icon_atividade.png'

import { ActivityContext, AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface CreateActivityProps {
  children?: ReactNode
}

export const CreateActivity = ({ children }: CreateActivityProps) => {
  const { ong, signOut } = useContext(AuthContext)
  const { createActivity } = useContext(ActivityContext)
  const { register, handleSubmit } = useForm()

  const navigate = useNavigate()

  const handleCreateActivity = async (
    name: string,
    description: string,
    points: number,
    mainImg: string,
  ) => {
    if (!ong?.ongId) {
      signOut()
    } else {
      const { ongId } = ong
      const created = await createActivity({
        name,
        description,
        points,
        ongId,
        mainImg,
      })

      if (created) {
        navigate('/home')
      } else {
        window.alert('Erro ao criar atividade!')
      }
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ name, description, points, mainImg }) => {
          handleCreateActivity(name, description, points, mainImg)
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

        <Button type="submit">Criar atividade</Button>
      </Form>
      {children}
    </Container>
  )
}
