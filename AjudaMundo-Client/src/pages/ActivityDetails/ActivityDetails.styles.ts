import styled from 'styled-components'

export const Container = styled.div`
  background-color: white;

  display: flex;
  justify-content: center;
  align-items: center;

  padding: 30px 0px 120px 0px;
`

export const Form = styled.form`
  height: auto;
  min-height: 400px;
  width: 100%;
  max-width: 1000px;

  position: relative;

  padding: 30px 0px;

  display: flex;
  flex-direction: column;

  justify-content: center;
  align-items: center;

  border: 1px solid gray;
  border-radius: 3px;
`

export const FieldTitle = styled.h2`
  font-weight: 500;
  font-size: 2rem;
  line-height: 3rem;

  margin-bottom: 10px;
`

export const Input = styled.input`
  width: 50%;

  max-width: 350px;

  font-size: 2rem;
  text-align: center;

  margin-bottom: 30px;

  border: 2px solid black;

  padding: 10px;

  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;

    border: 2px solid #0008;
  }

  :hover {
    border: 2px solid #0008;
  }
`

export const TextArea = styled.textarea`
  width: 50%;
  min-width: 350px;
  max-width: 350px;

  max-height: 300px;
  min-height: 50px;

  font-size: 1.3rem;
  text-align: left;

  margin-bottom: 30px;

  border: 2px solid black;

  padding: 10px;

  :focus {
    box-shadow: 0 0 0 0;
    outline: 0;

    border: 2px solid #0008;
  }

  :hover {
    border: 2px solid #0008;
  }
`

export const Button = styled.button`
  width: 60%;

  max-width: 450px;

  font-size: 2.4rem;

  padding: 1rem 3rem;
  margin: 5rem 0rem 1rem 0rem;

  background-color: #f0c32c;

  :hover {
    opacity: 0.5;
    transition: 300ms;

    cursor: pointer;
  }
`

export const IconActivity = styled.img`
  height: 150px;
  width: 150px;

  position: absolute;
  top: 0;
  left: 0;

  margin-left: 50px;
  margin-top: 50px;
`
