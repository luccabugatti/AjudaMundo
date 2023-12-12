import React from 'react'

import GlobalStyles from './styles/GlobalStyles'

import { Routing } from './routes/index'
import { AuthProvider, ActivityProvider } from './contexts'

function App() {
  return (
    <>
      <AuthProvider>
        <ActivityProvider>
          <Routing />
        </ActivityProvider>
      </AuthProvider>
      <GlobalStyles />
    </>
  )
}

export default App
