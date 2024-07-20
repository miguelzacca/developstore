'use client'

import { useRef, useState } from 'react'
import './page.scss'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

export default function Account() {
  const mainTag = useRef<HTMLElement>(null)
  const [user, setUser] = useState()

  fetch(`${API_ADDR}/user`, {
    credentials: 'include',
  })
    .then(async (res) => {
      if (!res.ok) {
        return (location.href = '/login')
      }

      setUser(await res.json())
    })
    .catch(() => (location.href = '/login'))

  return (
    <main id="Account" ref={mainTag}>
      <h2>{user && user['uname']}</h2>
      <h3>{user && user['email']}</h3>
    </main>
  )
}
