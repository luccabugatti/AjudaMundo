import { useContext } from 'react'

import { AuthContext } from './AuthContext'

import { Navigate } from 'react-router-dom'

type RequireAuthType = {
  children: JSX.Element
}

export const RequireAuth = ({ children }: RequireAuthType) => {
  const { ong } = useContext(AuthContext)
  const { user } = useContext(AuthContext)

  if (!ong && !user) {
    return <Navigate to="/" />
  }

  return children
}
