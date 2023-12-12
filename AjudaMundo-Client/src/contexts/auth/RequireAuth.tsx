import { useContext } from 'react'

import { AuthContext } from './AuthContext'

import { Navigate } from 'react-router-dom'

type RequireAuthType = {
  children: JSX.Element
}

export const RequireAuth = ({ children }: RequireAuthType) => {
  const { ong } = useContext(AuthContext)

  if (!ong) {
    return <Navigate to="/" />
  }

  return children
}
