import { useContext} from 'react'

import { Container, FormTitle, Form, Input, Button } from './RegisterOng.styles'
import { AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface RegisterProps {
  children?: JSX.Element
}

export const RegisterOng = ({ children }: RegisterProps) => {
  const { register, handleSubmit } = useForm()
  const { signUpOng } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const loggedIn = await signUpOng(name, email, password)

    if (loggedIn) {
      navigate('/home-ong');
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

        <Input placeholder="Nome da ONG" type={'name'} {...register('name')} />
        <Input placeholder="E-mail" type={'email'} {...register('email')} />
        <Input placeholder="Senha" type={'password'} {...register('password')} />

        <Button type="submit">Cadastrar ONG</Button>
        
        <h1>Ou</h1>
        <Button onClick={() => navigate('/')}>
          Se já possui conta, faça login
        </Button>
      </Form>
    </Container>
  )
}
