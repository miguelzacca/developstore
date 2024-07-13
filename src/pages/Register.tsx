import { useRef, FormEvent, useState } from 'react'
import '../styles/pages/Auth.scss'

import { AnimeButton } from '../components/AnimeButton'
import { utils } from '../utils'

const { VITE_API_HOST } = import.meta.env

export function Register() {
  const form = useRef<HTMLFormElement>(document.createElement('form'))
  const msgRef = useRef<HTMLDivElement>(null)
  const [isPending, setPending] = useState(false)

  const registerRequest = () => {
    const formData = new FormData(form.current)
    const jsonData = utils.formDataToJson(formData)

    setPending(true)
    fetch(`${VITE_API_HOST}/auth/register`, {
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
        utils.handleMsg({ msg: 'Verify your email.' }, msgRef)
      })
      .catch((err) => console.error(err))
      .finally(() => setPending(false))
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    registerRequest()
    form.current.reset()
  }

  return (
    <main id="Auth">
      <div ref={msgRef} id="msg"></div>
      <form ref={form} onSubmit={handleFormSubmit}>
        <div className="header"></div>
        <h2>Register</h2>
        <div className="input-container">
          <input type="text" name="name" id="name" placeholder=" " required />
          <label htmlFor="name">Username</label>
        </div>
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
      </form>
      <a id="handleAuthPage" href="login">
        Login
      </a>
    </main>
  )
}
