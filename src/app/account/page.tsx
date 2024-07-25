'use client'

import { useEffect, useRef } from 'react'
import { useAuth } from '@/hooks/useAuth'

import './page.scss'

export default function Account() {
  const mainTag = useRef<HTMLElement>(null)
  const { User, checkAuth } = useAuth()

  useEffect(() => {
    const checkAuthProcess = async () => {
      const access = await checkAuth()
      if (!access) {
        location.replace('/login')
      }
    }

    checkAuthProcess()
  }, [checkAuth])

  return (
    <main id="Account" ref={mainTag}>
      <h2>{User?.uname}</h2>
      <h3>{User?.email}</h3>
    </main>
  )
}
