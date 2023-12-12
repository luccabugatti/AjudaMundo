import styled from 'styled-components'

export const Container = styled.div`
  height: 30%;
  min-height: 250px;
  width: 30%;
  min-width: 250px;

  :hover {
    cursor: pointer;
    opacity: 0.9;
    transition: 400ms;
  }
`

export const WrapperActivityImage = styled.div`
  height: 85%;
  width: 100%;

  background-color: white;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;

  border: 1px solid;
`

export const WrapperActivityName = styled.div`
  height: 15%;
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  padding: 10px 5px;

  background-color: black;
`

export const LabelActivityName = styled.h3`
  color: white;
  font-size: 1.2rem;
  text-align: center;
`
