import { createContext, useEffect, useState } from 'react'
import { UserData } from '@/types/global'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

interface AuthContextType {
  isLoggedIn: boolean
  User?: UserData
  checkAuth: () => Promise<boolean>
}

interface AuthProviderType {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [User, setUser] = useState<UserData>()

  const checkAuth = async () => {
    const res = await fetch(`${API_ADDR}/user`, { credentials: 'include' })
    if (res.ok) {
      setIsLoggedIn(true)
      setUser(await res.json())
      return true
    }
    return false
  }

  useEffect(() => {
    checkAuth()
  }, [])

  return (
    <AuthContext.Provider value={{ isLoggedIn, User, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
