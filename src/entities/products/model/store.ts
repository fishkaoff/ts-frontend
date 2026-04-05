import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductsFilter } from './types'
import { fetchProductById, fetchProducts } from '../api'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Array<Product>>([])

  async function loadProducts(filter: ProductsFilter) {
    try {
      let response = await fetchProducts(filter)
      products.value = response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function getProductById(id: string): Promise<any> {
    try {
      let response = await fetchProductById(id)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { products, loadProducts, getProductById }
})
