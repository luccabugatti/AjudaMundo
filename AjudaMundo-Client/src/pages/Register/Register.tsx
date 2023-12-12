import { useContext, useState } from 'react'

import { Container, FormTitle, Form, Input, Button } from './Register.styles'
import { AuthContext } from '../../contexts'

import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

interface RegisterProps {
  children?: JSX.Element
}

export const Register = ({ children }: RegisterProps) => {
  const { register, handleSubmit } = useForm()
  const { signUp } = useContext(AuthContext)
  const navigate = useNavigate()
  const [userType, setUserType] = useState('ong')

  const handleRegister = async (
    name: string,
    email: string,
    password: string,
  ) => {
    const loggedIn = await signUp(name, email, password)

    if (loggedIn) {
      if (userType === 'ong') {
        navigate('/home');
      } else if (userType === 'user') {
        navigate('/home-user');
      }
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

        <label>
          Tipo de Usuário:
          <select value={userType} onChange={(e) => setUserType(e.target.value)}>
            <option value="ong">ONG</option>
            <option value="user">Usuário</option>
          </select>
        </label>

        <Input
          placeholder={`${userType === 'ong' ? 'ONG' : 'Usuário'} name`}
          type={'text'}
          {...register('name')}
        />

        <Input placeholder="E-mail" type={'email'} {...register('email')} />
        <Input placeholder="Senha" type={'password'} {...register('password')} />

        <Button type="submit">Cadastrar {userType === 'ong' ? 'ONG' : 'Usuário'}</Button>
        
        <h1>Ou</h1>
        <Button onClick={() => navigate('/')}>
          Se já possui conta, faça login
        </Button>
      </Form>
    </Container>
  )
}
