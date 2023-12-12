import styled from 'styled-components'

export const Container = styled.div`
  height: auto;

  background-color: white;

  display: flex;
  flex-direction: row;
`

export const WrapperLeft = styled.section`
  width: 50%;

  display: flex;
  flex-direction: column;

  justify-content: flex-start;
  align-items: flex-start;

  padding: 30px 30px 130px 30px;

  margin: 30px 0px 90px 0px;

  border-right: 3px solid black;
`

export const WrapperActivities = styled.section`
  width: 100%;

  margin-top: 20px;

  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  grid-gap: 20px;
`

export const LabelNoActivities = styled.h2`
  color: #ebe1c7;
`

export const WrapperInformation = styled.section`
  padding: 120px 30px 120px 30px;

  width: 50%;

  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`

export const LabelInformation = styled.p`
  width: 55%;

  margin-bottom: 30px;

  font-size: 2rem;
  font-weight: 600;
  line-height: 3rem;
  text-align: center;
`

export const Indicator = styled.div`
  width: 300px;

  padding: 5px;
  margin-bottom: 15px;

  text-align: center;
  font-weight: 700;

  background-color: #fade7d;
`

export const WrapperRegisterActivity = styled.div`
  width: 300px;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
`

export const IconRegisterActivity = styled.img`
  height: 100px;
  width: 100px;

  :hover {
    cursor: pointer;
    opacity: 0.6;
    transition: 200ms;
  }
`

export const IconHero = styled.img`
  height: 200px;
  width: 200px;
`
