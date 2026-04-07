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

export const fetchProductsByQuery = async (query: string, page: number, limit: number) => {
  return $host.get('/products/search', {
    params: {
      query: query,
      limit: limit,
      page: page,
    },
  })
}
