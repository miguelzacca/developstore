import { FormEvent, useRef, useState } from 'react'
import '../styles/pages/Auth.scss'

import { AnimeButton } from '../components/AnimeButton'
import utils from '../utils'

const { VITE_API_HOST } = import.meta.env

export function Login() {
  const form = useRef<HTMLFormElement>(document.createElement('form'))
  const msgRef = useRef<HTMLDivElement>(null)
  const [isPending, setPending] = useState(false)

  const loginRequest = () => {
    const formData = new FormData(form.current)
    const jsonData = utils.formDataToJson(formData)
    
    setPending(true)
    fetch(`${VITE_API_HOST}/auth/login`, {
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
          await utils.wait(1000)
          location.href = '/account'
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setPending(false))
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    loginRequest()
    form.current.reset()
  }

  return (
    <main id="Auth">
      <div ref={msgRef} id="msg"></div>
      <form ref={form} onSubmit={handleFormSubmit}>
        <div className="header"></div>
        <h2>Login</h2>
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
        <AnimeButton loading={isPending} />
        <p>
          Forgot password? <a href="passwd-recovery">Recovery password</a>
        </p>
      </form>
      <a id="handleAuthPage" href="register">
        Register
      </a>
    </main>
  )
}
