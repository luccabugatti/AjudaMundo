import { ReactNode } from 'react'

import Logo from '../../assets/imgs/logo.png'
import DefaultHeaderImage from '../../assets/imgs/header_login.jpeg'

import {
  Container,
  WrapperTitle,
  HeaderImage,
  LogoImage,
  HeaderNavigation,
  NavigationItem,
  RouteIndicator,
} from './Header.styles'

import { useNavigate, useLocation } from 'react-router-dom'

interface HeaderProps {
  children?: ReactNode
  headerImage?: string
  loggedIn: boolean
  tabs: string[]
}

export const Header = ({
  children,
  headerImage = DefaultHeaderImage,
  loggedIn,
  tabs,
}: HeaderProps) => {
  const navigate = useNavigate()
  const location = useLocation()

  const actualPage = location.pathname.substring(1)

  const formatTabName = (tabName: string): string => {
    const firstLetterFormated = tabName.substring(0, 1).toLocaleUpperCase()
    const restOfTabName = tabName.substring(1)

    const formatedTabName = `${firstLetterFormated}${restOfTabName}`.replace(
      '-',
      ' ',
    )

    return formatedTabName
  }

  return (
    <Container>
      <WrapperTitle loggedIn={loggedIn}>
        <LogoImage src={Logo} />
        <h5>AjudaMundo</h5>
      </WrapperTitle>
      {loggedIn && (
        <HeaderNavigation>
          {tabs.map((tab, index) => (
            <NavigationItem key={index} onClick={() => navigate(tab)}>
              {formatTabName(tab)}
            </NavigationItem>
          ))}
        </HeaderNavigation>
      )}

      <HeaderImage style={{ backgroundImage: `url(${headerImage})` }}>
        {loggedIn && (
          <RouteIndicator>{formatTabName(actualPage)}</RouteIndicator>
        )}
      </HeaderImage>
      {children}
    </Container>
  )
}
