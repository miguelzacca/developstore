'use client'

import { ChangeEvent, useEffect, useState } from 'react'
import { useAuth } from '@/hooks/useAuth'
import { UserData } from '@/types/global'

import './page.scss'
import { Header } from '@/components/Header/Header'
import Image from 'next/image'
import imageCompression from 'browser-image-compression'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

export default function Account() {
  const { checkAuth } = useAuth()
  const [user, setUser] = useState<UserData>()
  const [b64Image, setB64Image] = useState<string | undefined>(
    user?.profile_image
  )

  const updateUserField = async (fieldName: string, fieldValue: any) => {
    await fetch(`${API_ADDR}/user/update-field`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fieldName,
        fieldValue,
      }),
      credentials: 'include',
    })
  }

  const removeImage = () => {
    updateUserField('profile_image', null)
    setB64Image('/images/profile-image.webp')
  }

  const convertToB64 = async (file: File): Promise<string> => {
    return new Promise((res, rej) => {
      const reader = new FileReader()
      reader.readAsDataURL(file)
      reader.onload = () => res(reader.result as string)
      reader.onerror = (err) => rej(err)
    })
  }

  const setImage = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 0.002,
        useWebWorker: true,
      })

      const b64 = await convertToB64(compressedFile)
      setB64Image(b64)
      updateUserField('profile_image', b64)
    }
  }

  useEffect(() => {
    const checkAuthProcess = async () => {
      const result = await checkAuth()
      if (!result) {
        location.replace('/login')
        return
      }
      setUser(result)
    }

    checkAuthProcess()
  }, [checkAuth])

  return (
    <>
      <Header path="account" />
      <main id="Account">
        <div className="profile-container">
          <Image
            src={
              b64Image || user?.profile_image || '/images/profile-image.webp'
            }
            alt="Profile image"
            className="profile-image"
            width={150}
            height={150}
            priority={true}
          />
          <div>
            <h2 className={!user ? 'load' : undefined}>{user?.uname}</h2>
            <h3 className={!user ? 'load' : undefined}>{user?.email}</h3>
            <div className="change-image-container">
              <input
                type="file"
                id="imageInput"
                accept="image/*"
                onChange={setImage}
              />
              <label htmlFor="imageInput">Change image</label>
              <button onClick={removeImage}>Remove image</button>
            </div>
          </div>
        </div>
      </main>
    </>
  )
}
