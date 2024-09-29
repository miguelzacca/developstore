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

  wait = (ms: number) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms)
    })
  }

  formDataToJson = (formData: FormData) => {
    const obj: IObjFromFormData = {}
    for (const [key, value] of formData) {
      obj[key] = value
    }
    return JSON.stringify(obj)
  }

  handleMsg = (data: IObjKey, msgRef: RefObject<HTMLDivElement>) => {
    const display = msgRef.current
    if (!display) {
      throw new Error('Missing msgRef prop.')
    }
    display.textContent = data.msg || data.zod
    this.animeMsg(display)
  }

  getProducts: GetProducts = async (filters) => {
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

  getURLSearchParam = (query: string) => {
    if (typeof window === 'undefined') return

    return location.search
      ?.split(`${query}=`)[1]
      ?.split('&')[0]
      ?.split('%20')
      .join(' ')
  }

  setURLSearchParam = (queryName: string, value: any) => {
    if (typeof window === 'undefined') return

    const andQuery = location.search ? '&' : '?'
    history.pushState(
      {},
      '',
      `${location.search}${andQuery}${queryName}=${value}`,
    )
  }

  removeURLSearchParam = (queryName: string) => {
    if (typeof window === 'undefined') return

    const query = location.search.replace('?', '&').split('&')
    const clsQuery = query.filter((q) => !q.includes(queryName))
    const endQuery = `?${clsQuery.join('&').replace('&', '')}`
    history.pushState({}, '', endQuery)
  }

  getAllFavorites = async () => {
    if (typeof window === 'undefined') return

    return await fetch(`${API_ADDR}/user/get-favorites`, {
      credentials: 'include',
    }).then(async (res) => {
      return await res.json()
    })
  }

  toggleFavorite = async (productId: number) => {
    if (typeof window === 'undefined') return

    await fetch(`${API_ADDR}/user/toggle-favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
      credentials: 'include',
    })
  }

  redirectTo = (path: string) => {
    if (typeof window === 'undefined') return
    location.replace(path)
  }
}

export const utils = new Utils()
