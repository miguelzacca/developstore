import { useRef, useState } from 'react'
import '../styles/pages/Account.scss'

export function Account() {
  const mainTag = useRef<HTMLElement>(null)
  const [user, setUser] = useState()

  fetch(`${import.meta.env['VITE_API_HOST']}/user`, {
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
