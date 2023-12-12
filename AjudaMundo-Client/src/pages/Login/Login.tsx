import { useContext } from 'react'

import { Container, FormTitle, Form, Input, Button } from './Login.styles'
import { AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  children?: JSX.Element
}

export const Login = ({ children }: LoginProps) => {
  const { register, handleSubmit } = useForm()
  const { signIn } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (email: string, password: string, userType: string) => {
    const loggedIn = await signIn(email, password)

    if (loggedIn) {
      if(userType == 'user'){
        navigate('/home-user')
      }else{
        navigate('/home')
      }     
    } else {
      window.alert('Erro ao realizar login!')
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ email, password, userType }) =>
          handleLogin(email, password, userType),
        )}
      >
        <FormTitle>Login</FormTitle>
        <Input placeholder="E-mail" type={'email'} {...register('email')} />
        <Input
          placeholder="Senha"
          type={'password'}
          {...register('password')}
        />
        <select {...register('userType')}>
          <option value="user">Usuário</option>
          <option value="ong">ONG</option>
        </select>
        <Button type="submit">Entrar</Button>
        <h1>Ou</h1>
        <Button onClick={() => navigate('/cadastro')}>Cadastre-se</Button>
      </Form>
    </Container>
  )
}
