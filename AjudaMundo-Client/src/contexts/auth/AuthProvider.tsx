import { useEffect, useState } from 'react'

import { AuthContext } from './AuthContext'
import { OngType } from '../../types'

import { useApi } from '../../hooks'

type AuthProviderType = {
  children: JSX.Element
}

export const AuthProvider = ({ children }: AuthProviderType) => {
  const [ong, setOng] = useState<OngType | null>(null)
  const api = useApi()

  useEffect(() => {
    ;(async () => {
      const token = localStorage.getItem('access-token')

      if (token) {
        await getOngData(token)
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

  const signIn = async (email: string, password: string): Promise<boolean> => {
    try {
      const { token } = await api.signIn(email, password)
      if (token) {
        const ongData = await api.getOngData(token)

        if (ongData) {
          console.log(ongData)
          setOng(ongData.ong)
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

  const signUp = async (
    ongName: string,
    email: string,
    password: string,
  ): Promise<boolean> => {
    try {
      const { result } = await api.signUp(ongName, email, password)
      if (result.ongId) {
        window.alert('Ong criada com sucesso!')

        await signIn(email, password)
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
  }

  const setTokenOnLocalStorage = (token: string) => {
    localStorage.setItem('access-token', token)
  }

  return (
    <AuthContext.Provider value={{ ong, signIn, signOut, signUp }}>
      {children}
    </AuthContext.Provider>
  )
}
