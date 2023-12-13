import { useContext} from 'react'

import { Container, FormTitle, Form, Input, Button } from './RegisterUser.styles'
import { AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface RegisterProps {
  children?: JSX.Element
}

export const RegisterUser = ({ children }: RegisterProps) => {
  const { register, handleSubmit } = useForm()
  const { signUpUser } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const loggedIn = await signUpUser(name, email, password)

    if (loggedIn) {
      navigate('/home-user');
    } else {
      window.alert('Erro ao realizar cadastro!');
    }
  }

  return (
    <Container>
      <Form
        onSubmit={handleSubmit(({ name, email, password }) =>
          handleRegister(name, email, password),
        )}
      >
        <FormTitle>Cadastro</FormTitle>

        <Input placeholder="Nome" type={'name'} {...register('name')} />
        <Input placeholder="E-mail do usuário" type={'email'} {...register('email')} />
        <Input placeholder="Senha" type={'password'} {...register('password')} />

        <Button type="submit">Cadastrar usuário</Button>
        
        <h1>Ou</h1>
        <Button onClick={() => navigate('/')}>
          Se já possui conta, faça login
        </Button>
      </Form>
    </Container>
  )
}
