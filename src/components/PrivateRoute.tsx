import { JSX, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Home } from '../pages/Home'

interface props {
  children: JSX.Element
}

const { VITE_API_HOST } = import.meta.env

export function PrivateRoute({ children }: props) {
  const { token } = useParams()
  const [loading, setLoading] = useState(true)
  const [access, setAccess] = useState(false)

  useEffect(() => {
    fetch(`${VITE_API_HOST}/auth/token-validator/${token}?setCookie=true`, {
      credentials: 'include',
    })
      .then((res) => {
        if (res.ok) {
          setAccess(true)
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false))
  }, [token])

  if (loading) {
    return null
  }

  if (access) {
    return children
  }

  return <Home />
}
