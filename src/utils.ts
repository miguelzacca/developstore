import { RefObject } from 'react'
import { ProductEl } from './types/global'

const { VITE_API_HOST } = import.meta.env

interface IObjKey {
  [key: string]: string
}

interface IObjFromFormData {
  [key: string]: FormDataEntryValue
}

type GetProductsFn = (category: string) => Promise<ProductEl[]>

class Utils {
  private _animeMsg = async (display: Element) => {
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
    this._animeMsg(display)
  }

  public getProducts: GetProductsFn = async (category) => {
    return await fetch(`${VITE_API_HOST}/products?category=${category}`).then(
      async (res) => {
        return await res.json()
      }
    )
  }
}

export const utils = new Utils()
