import { createContext } from 'react'

import { OngType } from '../../types'

export type AuthContextType = {
  ong: OngType | null
  signIn: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  signUp: (ongName: string, email: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>(null!)
