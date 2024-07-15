import { FormEvent, useRef, useState } from 'react'
import { utils } from '../utils'

import { AnimeButton } from '../components/AnimeButton'
import '../styles/pages/Auth.scss'

const { VITE_API_HOST } = import.meta.env

interface AuthProps {
  process: 'login' | 'register' | 'passwd-recovery'
}

type HandleAction = Record<string, (jsonData: string) => Promise<void>>

export function Auth({ process }: AuthProps) {
  const [isPending, setPending] = useState(false)

  const form = useRef<HTMLFormElement>(document.createElement('form'))
  const msgRef = useRef<HTMLDivElement>(null)

  const formReset = () => form.current.reset()

  const loginRequest = async (jsonData: string) => {
    await fetch(`${VITE_API_HOST}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json()
        utils.handleMsg(data, msgRef)

        if (res.ok) {
          formReset()
          await utils.wait(1000)
          location.href = '/account'
        }
      })
      .catch((err) => console.error(err))
  }

  const registerRequest = async (jsonData: string) => {
    await fetch(`${VITE_API_HOST}/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: jsonData,
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          return utils.handleMsg(data, msgRef)
        }

        formReset()
        utils.handleMsg({ msg: 'Verify your email.' }, msgRef)
      })
      .catch((err) => console.error(err))
  }

  const passwdRecoveryRequest = async (jsonData: string) => {
    const email = JSON.parse(jsonData).email

    await fetch(`${VITE_API_HOST}/auth/passwd-recovery/${email}`, {
      credentials: 'include',
    })
      .then(async (res) => {
        const data = await res.json()

        if (!res.ok) {
          return utils.handleMsg(data, msgRef)
        }

        formReset()
        utils.handleMsg({ msg: 'Verify your email.' }, msgRef)
      })
      .catch((err) => console.error(err))
  }

  const handleAction: HandleAction = {
    login: loginRequest,
    register: registerRequest,
    'passwd-recovery': passwdRecoveryRequest,
  }

  const handleFormSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const formData = new FormData(form.current)
    const jsonData = utils.formDataToJson(formData)

    setPending(true)
    await handleAction[process](jsonData)
    setPending(false)
  }

  const pageHandler = process === 'login' ? 'register' : 'login'

  return (
    <main id="Auth">
      <div ref={msgRef} id="msg"></div>
      <form ref={form} onSubmit={handleFormSubmit}>
        <div className="header"></div>
        <h2>{process}</h2>

        {process === 'register' ? (
          <div className="input-container">
            <input type="text" name="name" id="name" placeholder=" " required />
            <label htmlFor="name">Username</label>
          </div>
        ) : null}

        <div className="input-container">
          <input
            type="email"
            name="email"
            id="email"
            placeholder=" "
            required
          />
          <label htmlFor="email">Email</label>
        </div>

        {process !== 'passwd-recovery' ? (
          <div className="input-container">
            <input
              type="password"
              name="passwd"
              id="passwd"
              placeholder=" "
              required
            />
            <label htmlFor="passwd">Password</label>
          </div>
        ) : null}

        <AnimeButton loading={isPending} />

        {process === 'login' ? (
          <p>
            Forgot password? <a href="passwd-recovery">Recovery password</a>
          </p>
        ) : null}
      </form>
      <a id="handleAuthPage" href={`/${pageHandler}`}>
        {pageHandler}
      </a>
    </main>
  )
}
