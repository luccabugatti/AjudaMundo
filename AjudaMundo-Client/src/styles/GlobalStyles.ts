import { createGlobalStyle } from 'styled-components'

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;

    @font-face {
      font-family: 'Poppins';
      src: url('https://fonts.googleapis.com/css2?family=Poppins:wght@500&display=swap');
    }
    font-family: 'Poppins', sans-serif;
  }

  html {
    font-size: 62.5%;
  }

  body {
    font-size: 1.6rem;
  }

  html, body, #root {
    max-height: 100vh;
    max-width: 100vw;

    height: 100%;
    width: 100%;
  }

  *, button, input {
    border: 0;
    background: none;
  }
`
