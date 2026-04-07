import { useProductsStore } from '@/entities/products/model/store'
import type { Product } from '@/entities/products/model/types'
import { ref } from 'vue'

export function useSearch() {
  const productsStore = useProductsStore()
  const query = ref('')

  const search = async (page: number, limit: number) => {
    try {
      const products: Product[] = await productsStore.searchProducts(query.value, page, limit)
      return products
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return {
    query,
    search,
  }
}
