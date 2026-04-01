import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductsFilter } from './types'
import { fetchProducts } from '../api'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Array<Product>>([])

  async function loadProducts(filter: ProductsFilter) {
    try {
      let response = await fetchProducts(filter)
      products.value = response.data
    } catch (error) {
      console.error(error)
      throw new Error('Неожиданная ошибка, попробуйте позже')
    }
  }

  return { products, loadProducts }
})
