import styled from 'styled-components'

export type AccountInfo = {
  loggedIn: boolean
}

export const Container = styled.header`
  height: 45%;
  width: 100%;

  background-color: white;
`

export const WrapperTitle = styled.nav<AccountInfo>`
  height: auto;
  width: 100%;

  padding: 5px 0px;

  background-color: ${(props) => (props.loggedIn ? '#FADE7D' : 'white')};

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

export const LogoImage = styled.img`
  height: 4rem;
  width: 4rem;
`

export const HeaderImage = styled.div`
  height: 90%;
  width: 100%;

  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;

  display: flex;

  justify-content: flex-start;
  align-items: flex-start;
`

export const HeaderNavigation = styled.ul`
  display: flex;

  justify-content: space-between;
  align-items: center;

  height: auto;
  width: 100%;

  background-color: #fade7d;

  padding: 10px 15%;
`

export const NavigationItem = styled.li`
  display: block;

  height: auto;
  width: 15%;

  padding: 10px;

  text-align: center;

  list-style: none;

  font-weight: 700;

  cursor: pointer;

  :hover {
    opacity: 0.5;
    transition: 300ms;
  }
`

export const RouteIndicator = styled.div`
  width: 300px;

  padding: 5px;
  margin-top: 4%;

  background-color: #fade7d;

  text-align: center;
  font-weight: 700;
`
