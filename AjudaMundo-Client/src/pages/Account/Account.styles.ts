import styled from 'styled-components'

export const Container = styled.div`
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 40px 0px 120px 0px;
`

export const WrapperProfileInfo = styled.div`
  min-height: 500px;
  min-width: 400px;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;

  padding: 20px 0px 20px 0px;

  border: 1px solid black;
`

export const ProfileImage = styled.div`
  min-height: 200px;
  min-width: 200px;

  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border-radius: 50%;
`

export const LabelOngName = styled.h1`
  margin-top: 20px;
  font-weight: 500;
`

export const LabelOngEmail = styled.h3`
  margin-top: 10px;
  font-weight: 500;
`

export const ButtonLogout = styled.button`
  width: 60%;

  max-width: 450px;

  font-size: 2.4rem;

  padding: 1rem 3rem;
  margin: 5rem 0rem 1rem 0rem;

  background-color: #fade7d;

  :hover {
    opacity: 0.5;
    transition: 300ms;

    cursor: pointer;
  }
`
