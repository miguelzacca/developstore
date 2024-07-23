import { RefObject } from 'react'
import { ProductEl } from './types/global'

const API_ADDR = process.env.NEXT_PUBLIC_API_ADDR

interface IObjKey {
  [key: string]: string
}

interface IObjFromFormData {
  [key: string]: FormDataEntryValue
}

type GetProducts = (filters?: {
  search?: string
  category?: string
}) => Promise<ProductEl[]>

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

  public getProducts: GetProducts = async (filters) => {
    if (!filters) {
      const res = await fetch(`${API_ADDR}/products`)
      return await res.json()
    }

    const { search, category } = filters

    if (category) {
      const res = await fetch(`${API_ADDR}/products?category=${category}`)
      return await res.json()
    }

    const res = await fetch(`${API_ADDR}/products?search=${search}`)
    return await res.json()
  }

  public getURLSearchParam = (query: string) => {
    if (typeof window === 'undefined') return

    return location.search
      ?.split(`${query}=`)[1]
      ?.split('&')[0]
      ?.split('%20')
      .join(' ')
  }

  public isFavorite = (id: number): boolean => {
    if (typeof window === 'undefined') return false

    const storedFavorites = localStorage.getItem('favoritesId')
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []
    return parsedFavorites.includes(id)
  }

  public getAllFavorites = async () => {
    if (typeof window === 'undefined') return

    return await fetch(`${API_ADDR}/user/get-favorites`, {
      credentials: 'include',
    }).then(async (res) => {
      const data = await res.json()
      sessionStorage.setItem('favorites', JSON.stringify(data))
      localStorage.setItem(
        'favoritesId',
        JSON.stringify(data.map((el: ProductEl) => el.id))
      )
      return data
    })
  }

  public toggleFavorite = (productId: number) => {
    if (typeof window === 'undefined') return

    fetch(`${API_ADDR}/user/toggle-favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
      credentials: 'include',
    })

    const storedFavorites = sessionStorage.getItem('favoritesId')
    const parsedFavorites = storedFavorites ? JSON.parse(storedFavorites) : []

    if (parsedFavorites?.includes(productId)) {
      return localStorage.setItem(
        'favoritesId',
        JSON.stringify(parsedFavorites.filter((id: number) => id === id))
      )
    }

    localStorage.setItem(
      'favoritesId',
      JSON.stringify([...parsedFavorites, productId])
    )
  }

  public redirectTo = (path: string) => {
    if (typeof window === 'undefined') return
    location.replace(path)
  }
}

export const utils = new Utils()
