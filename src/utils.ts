import { RefObject } from 'react'
import { ProductEl } from './types/global'
import { middleware } from 'func-middleware'

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

const clientSide = () => {
  if (typeof window === 'undefined') {
    return false
  }
}

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

  getURLSearchParam = middleware((query: string) => {
    return location.search
      ?.split(`${query}=`)[1]
      ?.split('&')[0]
      ?.split('%20')
      .join(' ')
  }, clientSide)

  setURLSearchParam = middleware((queryName: string, value: any) => {
    const andQuery = location.search ? '&' : '?'
    history.pushState(
      {},
      '',
      `${location.search}${andQuery}${queryName}=${value}`,
    )
  }, clientSide)

  removeURLSearchParam = middleware((queryName: string) => {
    const query = location.search.replace('?', '&').split('&')
    const clsQuery = query.filter((q) => !q.includes(queryName))
    const endQuery = `?${clsQuery.join('&').replace('&', '')}`
    history.pushState({}, '', endQuery)
  }, clientSide)

  getAllFavorites = middleware(async () => {
    return await fetch(`${API_ADDR}/user/get-favorites`, {
      credentials: 'include',
    }).then(async (res) => {
      return await res.json()
    })
  }, clientSide)

  getAllShopping = middleware(async () => {
    return await fetch(`${API_ADDR}/user/get-shopping `, {
      credentials: 'include',
    }).then((res) => res.json())
  }, clientSide)

  toggleFavorite = middleware(async (productId: number) => {
    await fetch(`${API_ADDR}/user/toggle-favorite`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
      credentials: 'include',
    })
  }, clientSide)

  toggleShopping = middleware(async (productId: number) => {
    await fetch(`${API_ADDR}/user/toggle-shopping`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productId }),
      credentials: 'include',
    })
  }, clientSide)

  redirectTo = middleware((path: string) => {
    location.replace(path)
  }, clientSide)
}

export const utils = new Utils()
