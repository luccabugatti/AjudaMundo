import { ReactNode } from 'react'

import { Container, FooterTitle } from './Footer.styles'

interface FooterProps {
  children?: ReactNode
}

export const Footer = ({ children }: FooterProps) => {
  return (
    <Container>
      <FooterTitle>@AjudaMundo by Universidade Anhembi Morumbi</FooterTitle>
    </Container>
  )
}
