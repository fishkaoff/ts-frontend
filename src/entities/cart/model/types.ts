import type { Product } from '@/entities/products/model/types'

export interface CartItem {
  product: Product
  quantity: number
}

export interface Cart {
  id: string
  user_id: string
  products: CartItem[]
}
