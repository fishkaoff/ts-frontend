import { $authHost } from '@/shared/api'
import type { CartItem } from '../model/types'

export const fetchUsersCart = async () => {
  return $authHost.get('/carts')
}

export const updateProductQuantityRequest = async (dto: CartItem) => {
  return $authHost.put('/carts/items', dto)
}
