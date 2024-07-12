import { FormEvent, useRef, useState } from 'react'
import '../styles/pages/Auth.scss'

import { AnimeButton } from '../components/AnimeButton'
import utils from '../utils'

const { VITE_API_HOST } = import.meta.env

export function PasswdRecovery() {
  const form = useRef<HTMLFormElement>(document.createElement('form'))
  const msgRef = useRef<HTMLDivElement>(null)
  const [isPending, setPending] = useState(false)

  const changePasswd = () => {
    const formData = new FormData(form.current)
    const jsonData = utils.formDataToJson(formData)

    const email = JSON.parse(jsonData).email

    setPending(true)
    fetch(`${VITE_API_HOST}/auth/passwd-recovery/${email}`, {
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
    changePasswd()
    form.current.reset()
  }

  return (
    <main id="Auth">
      <div ref={msgRef} id="msg"></div>
      <form ref={form} onSubmit={handleFormSubmit}>
        <div className="header"></div>
        <h2>Recovery Password</h2>
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
        <AnimeButton loading={isPending} />
      </form>
    </main>
  )
}
