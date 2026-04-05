import { $host } from '@/shared/api'
import type { ProductsFilter } from '../model/types'

export const fetchProducts = async (filter: ProductsFilter) => {
  return $host.get('/products', {
    params: filter,
  })
}

export const fetchProductById = async (id: string) => {
  return $host.get(`/products/${id}`)
}
