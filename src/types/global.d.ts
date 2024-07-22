export interface ProductEl {
  id: number
  category: string
  productName: string
  info: string
  img: string
  oldPrice?: number
  price: number
}

export interface UserData {
  uname: string
  email: string
  createdAt: string
}
