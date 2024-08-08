'use client'

import { createContext, useCallback, useEffect, useState } from 'react'
import { UserData } from '@/types/global'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

interface AuthContextType {
  isLoggedIn: boolean
  User?: UserData
  checkAuth: () => Promise<UserData | undefined>
}

interface AuthProviderType {
  children: React.ReactNode
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: AuthProviderType) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)

  const checkAuth = useCallback(async () => {
    const res = await fetch(`${API_ADDR}/user`, { credentials: 'include' })
    if (res.ok) {
      setIsLoggedIn(true)
      return res.json()
    }
  }, [])

  useEffect(() => {
    checkAuth()
  }, [checkAuth])

  return (
    <AuthContext.Provider value={{ isLoggedIn, checkAuth }}>
      {children}
    </AuthContext.Provider>
  )
}
