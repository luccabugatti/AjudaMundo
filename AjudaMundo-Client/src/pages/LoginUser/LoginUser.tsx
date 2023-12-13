import { useContext } from 'react'

import { Container, FormTitle, Form, Input, Button } from './LoginUser.styles'
import { AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  children?: JSX.Element
}

export const LoginUser = ({ children }: LoginProps) => {
  const { register, handleSubmit } = useForm()
  const { signInUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string) => {
    const loggedIn = await signInUser(email, password)

    if (loggedIn) {
      navigate('/home-user') 
    } else {
      window.alert('Erro ao realizar login!')
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ email, password}) =>
          handleLogin(email, password),
        )}
      >
        <FormTitle>Login</FormTitle>
        <Input placeholder="E-mail do usuário" type={'email'} {...register('email')} />
        <Input
          placeholder="Senha"
          type={'password'}
          {...register('password')}
        />
        <Button type="submit">Entrar</Button>
        <h1>Ou</h1>
        <Button onClick={() => navigate('/cadastro-user')}>Cadastre-se</Button>
      </Form>
    </Container>
  )
}
