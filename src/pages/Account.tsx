import { useRef } from 'react'
import '../styles/pages/Account.scss'

export function Account() {
  const mainTag = useRef<HTMLElement>(null)

  fetch(`${import.meta.env['VITE_API_HOST']}/user`, {
    credentials: 'include',
  })
    .then((res) => {
      if (!res.ok) {
        return (location.href = '/login')
      }

      if (mainTag.current) {
        mainTag.current.textContent = 'SUCCESS'
      }
    })
    .catch((err) => {
      console.error(err)
      location.href = '/login'
    })

  return <main id="Account" ref={mainTag}></main>
}
