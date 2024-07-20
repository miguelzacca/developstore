'use client'

import { useRef, FormEvent, useState } from 'react'
import '../Auth/Auth.scss'

import { AnimeButton } from '../AnimeButton/AnimeButton'
import { utils } from '@/utils'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

export function PasswdChange() {
  const form = useRef<HTMLFormElement>(null)
  const msgRef = useRef<HTMLDivElement>(null)
  const [isPending, setPending] = useState(false)

  const changePasswd = () => {
    const formData = new FormData(form.current || undefined)
    const jsonData = utils.formDataToJson(formData)

    setPending(true)
    fetch(`${API_ADDR}/user/change-passwd`, {
      method: 'PATCH',
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
          location.href = '/login'
        }
      })
      .catch((err) => console.error(err))
      .finally(() => setPending(false))
  }

  const handleFormSubmit = (e: FormEvent) => {
    e.preventDefault()
    changePasswd()
    form.current?.reset()
  }

  return (
    <main id="Auth">
      <div ref={msgRef} id="msg"></div>
      <form ref={form} onSubmit={handleFormSubmit}>
        <div className="header"></div>
        <h2>Change Password</h2>
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
    </main>
  )
}
