import { createContext } from 'react'

import { OngType } from '../../types'
import { UserType } from '../../types/user'

export type AuthContextType = {
  ong: OngType | null
  user: UserType | null
  signInOng: (email: string, password: string) => Promise<boolean>
  signInUser: (email: string, password: string) => Promise<boolean>
  signOut: () => void
  signUpOng: (ongName: string, email: string, password: string) => Promise<boolean>
  signUpUser: (userName: string, email: string, password: string) => Promise<boolean>
}

export const AuthContext = createContext<AuthContextType>(null!)
