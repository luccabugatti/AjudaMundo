import styled from 'styled-components'

export const Container = styled.section`
  width: 100%;

  display: flex;
  justify-content: center;
  align-items: flex-start;

  padding: 40px 0px 120px;

  background-color: white;
`

export const FormTitle = styled.h1`
  color: black;
  font-size: 4rem;

  margin-bottom: 80px;
`

export const Form = styled.form`
  height: auto;
  width: 25%;
  max-width: 500px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;
`

export const Input = styled.input`
  width: 100%;

  font-size: 2.4rem;

  margin-bottom: 30px;

  border: 2px solid black;
  border-top: none;
  border-left: none;
  border-right: none;

  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;

    border: 2px solid #0008;
    border-top: none;
    border-left: none;
    border-right: none;
  }

  :hover {
    border: 2px solid #0008;
    border-top: none;
    border-left: none;
    border-right: none;
  }
`

export const Button = styled.button`
  font-size: 2.4rem;

  padding: 1rem 3rem;
  margin: 2rem 0rem;

  background-color: #fade7d;

  :hover {
    opacity: 0.5;
    transition: 300ms;

    cursor: pointer;
  }
`
