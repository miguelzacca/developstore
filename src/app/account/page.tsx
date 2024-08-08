'use client'

import { useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { UserData } from '@/types/global'

import './page.scss'

export default function Account() {
  const { checkAuth } = useAuth()
  const [user, setUser] = useState<UserData>()

  useEffect(() => {
    const checkAuthProcess = async () => {
      const result = await checkAuth()
      if (!result) {
        location.replace('/login')
        return
      }
      setUser(result)
    }

    checkAuthProcess()
  }, [checkAuth])

  return (
    <main id="Account">
      <h2>{user?.uname}</h2>
      <h3>{user?.email}</h3>
    </main>
  )
}
