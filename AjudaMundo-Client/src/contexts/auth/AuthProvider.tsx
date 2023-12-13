import { useEffect, useState } from 'react'

import { AuthContext } from './AuthContext'
import { OngType } from '../../types'

import { useApi } from '../../hooks'
import { UserType } from '../../types/user'

type AuthProviderType = {
  children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [ong, setOng] = useState<OngType | null>(null)
  const [user, setUser] = useState<UserType | null>(null)
  const api = useApi()

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('access-token')

      if (token) {
        await getOngData(token)
        await getUserData(token)
      }
    })()
  }, [])

  const getOngData = async (token: string) => {
    try {
      const ongData = await api.getOngData(token)
      setOng(ongData.ong)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access-token')
    }
  }

  const getUserData = async (token: string) => {
    try {
      const ongData = await api.getUserData(token)
      setUser(ongData.user)
    } catch (error) {
      console.log(error)
      localStorage.removeItem('access-token')
    }
  }

  const signInOng = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token } = await api.signInOng(email, password)
      if (token) {
        const ongData = await api.getOngData(token)

        if (ongData) {
          console.log(ongData)
          setOng(ongData.ong)
          setTokenOnLocalStorage(token)
          return true
        } else {
          throw new Error('Erro ao buscar ONG')
        }
      } else {
        throw new Error('Erro ao se autenticar')
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signInUser = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token } = await api.signInUser(email, password)
      if (token) {
        const userData = await api.getUserData(token)

        if (userData) {
          console.log(userData)
          setUser(userData.user)
          setTokenOnLocalStorage(token)
          return true
        } else {
          throw new Error('Erro ao buscar usuário')
        }
      } else {
        throw new Error('Erro ao se autenticar')
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signUpOng = async (
    ongName: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { result } = await api.signUpOng(ongName, email, password)
      if (result.ongId) {
        window.alert('Ong criada com sucesso!')

        await signInOng(email, password)
        return true
      } else {
        throw new Error('Erro ao se autenticar')
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signUpUser = async (
    userName: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { result } = await api.signUpUser(userName, email, password)
      if (result.userId) {
        window.alert('Usuario criado com sucesso!')

        await signInUser(email, password)
        return true
      } else {
        throw new Error('Erro ao se autenticar')
      }
    } catch (error) {
      console.log(error)
      return false
    }
  }

  const signOut = (): void => {
    setOng(null)
    setUser(null)
  }

  const setTokenOnLocalStorage = (token: string) => {
    localStorage.setItem('access-token', token)
  }

  return (
    <AuthContext.Provider value={{ ong,user, signInOng, signInUser, signOut, signUpOng, signUpUser }}>
      {children}
    </AuthContext.Provider>
  )
}
