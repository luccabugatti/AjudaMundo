import { ReactNode } from 'react'

import { Container } from './NotFound.styles'

interface NotFoundProps {
  children?: ReactNode
}

export const NotFound = ({ children }: NotFoundProps) => {
  return (
    <Container>
      <h1>404 Page not found!</h1>
      {children}
    </Container>
  )
}
