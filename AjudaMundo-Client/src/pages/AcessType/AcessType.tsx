import { useNavigate } from 'react-router-dom'

interface LoginProps {
  children?: JSX.Element
}

import {
  Container
} from './AcessType.styles'
import { Button } from '../LoginOng/LoginOng.styles'

export const AcessType = ({ children }: LoginProps) => {
  const navigate = useNavigate()

  return (
    <Container>
        <Button onClick={() => navigate('/login-user')}>Usuario</Button>
        <Button onClick={() => navigate('/login-ong')}>ONG</Button> 
    </Container>
  )
}

export default AcessType;
