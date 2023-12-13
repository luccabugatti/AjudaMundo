import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

interface LoginProps {
  children?: JSX.Element
}

import {
  Container
} from './AcessType.styles'
import { Button } from '../LoginOng/LoginOng.styles'
import { AuthContext } from '../../contexts'

export const AcessType = ({ children }: LoginProps) => {
  const navigate = useNavigate()

  const { ong, user } = useContext(AuthContext)

  if(ong) navigate('/home-ong')
  if(user) navigate('/home-user')

  return (
    <Container>
        <Button onClick={() => navigate('/login-user')}>Usuario</Button>
        <Button onClick={() => navigate('/login-ong')}>ONG</Button> 
    </Container>
  )
}

export default AcessType;
