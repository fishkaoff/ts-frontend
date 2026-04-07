import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Product, ProductsFilter } from './types'
import { fetchProductById, fetchProducts, fetchProductsByQuery } from '../api'

export const useProductsStore = defineStore('products', () => {
  const products = ref<Array<Product>>([])

  async function loadProducts(filter: ProductsFilter) {
    try {
      let response = await fetchProducts(filter)
      products.value = response.data
      return products.value
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

  async function searchProducts(query: string, page: number, limit: number): Promise<any> {
    try {
      let response = await fetchProductsByQuery(query, page, limit)
      return response.data
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  return { products, loadProducts, getProductById, searchProducts }
})
