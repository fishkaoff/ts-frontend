export interface CartItem {
  product_id: string
  quantity: number
}

export interface Cart {
  id: string
  user_id: string
  products: CartItem[]
}
