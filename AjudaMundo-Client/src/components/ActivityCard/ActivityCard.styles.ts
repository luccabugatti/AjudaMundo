import styled from 'styled-components'

type ActivityCardProps = {
  activity: {
    name: string
    points: number
    description: string
    mainImg: string
    status: number
    ongId: number
    userId: number | null
    realizationField: string | null
    activityId: number
    createdAt: string
    updatedAt: string
  }
}

type AuthProps = {
  isOng: boolean
}

export const Container = styled.div<ActivityCardProps & AuthProps>`
  height: 30%;
  min-height: 250px;
  width: 30%;
  min-width: 250px;

  margin-bottom: 40px;

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


export const WrapperFinishedActivity = styled.div<ActivityCardProps>`
  height: 15%;
  width: 100%;

  display: flex;

  justify-content: center;
  align-items: center;

  padding: 10px 5px;

  background-color: ${(props) => props.activity.status == 2 ? 'green' : props.activity.status == 1 ? 'orange' : 'gray'};
`

export const LabelActivityName = styled.h3`
  color: white;
  font-size: 1.2rem;
  text-align: center;
`

export const LabelFinishedActivity = styled.h3`
  color: white;
  font-size: 1.2rem;
  text-align: center;
`

export const AssignButton = styled.button<ActivityCardProps>`
  font-size: 1.4rem;
  width: 100%;
  padding: 10px 5px;
  background-color: ${(props) =>
    props.activity.status === 0 ? 'orange' : 'darkgrey'};
  color: white;

  z-index: 1;

  :hover {
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms;
  }
`

export const FinishButton = styled.button<ActivityCardProps>`
  font-size: 1.4rem;
  width: 100%;
  padding: 10px 5px;
  background-color: ${(props) =>
    props.activity.status === 0 ? 'green' : 'darkgrey'};
  color: white;

  z-index: 1;

  :hover {
    cursor: pointer;
    opacity: 0.7;
    transition: 200ms;
  }
`
