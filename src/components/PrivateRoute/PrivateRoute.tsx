'use client'

import { JSX, useEffect, useState } from 'react'
import { useParams } from 'next/navigation'

interface PrivateRouteProps {
  children: JSX.Element
}

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

export function PrivateRoute({ children }: PrivateRouteProps) {
  const [loading, setLoading] = useState(true)
  const [access, setAccess] = useState(false)

  const { token } = useParams()

  useEffect(() => {
    fetch(`${API_ADDR}/auth/token-validator/${token}?setCookie=true`, {
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

  if (!access) {
    location.pathname = '/404'
  }
}
