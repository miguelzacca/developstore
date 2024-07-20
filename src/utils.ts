import { RefObject } from 'react'
import { ProductEl } from './types/global'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

interface IObjKey {
  [key: string]: string
}

interface IObjFromFormData {
  [key: string]: FormDataEntryValue
}

type GetAllProducts = () => Promise<ProductEl[]>

class Utils {
  private animeMsg = async (display: Element) => {
    display.classList.toggle('msg-anime')
    await this.wait(5000)
    display.classList.toggle('msg-anime')
  }

  public wait = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  public formDataToJson = (formData: FormData) => {
    const obj: IObjFromFormData = {}
    for (const [key, value] of formData) {
      obj[key] = value
    }
    return JSON.stringify(obj)
  }

  public handleMsg = (data: IObjKey, msgRef: RefObject<HTMLDivElement>) => {
    const display = msgRef.current
    if (!display) {
      throw new Error('Missing msgRef prop.')
    }
    display.textContent = data.msg || data.zod
    this.animeMsg(display)
  }

  public getAllProducts: GetAllProducts = async () => {
    localStorage.setItem('lastFetch', new Date().getTime().toString())
    return await fetch(`${API_ADDR}/products`).then((res) => res.json())
  }

  public getURLSearchParam = (query: string) => {
    return location.search
      ?.split(`${query}=`)[1]
      ?.split('&')[0]
      ?.split('%20')
      .join(' ')
  }

  public has24hPassed = () => {
    const lastFetch = Number(localStorage.getItem('lastFetch'))
    const currentTime = new Date().getTime()
    const relativeTime = 24 * 60 * 60 * 1000
    return currentTime - lastFetch >= relativeTime
  }

  public isFavorite = (id: number): boolean => {
    const storedFavorites = localStorage.getItem('favorites')
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
    return parsedFavorites.includes(id)
  }
}

export const utils = new Utils()
