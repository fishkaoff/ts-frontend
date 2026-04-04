import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { Cart, CartItem } from './types'
import { fetchUsersCart, updateProductQuantityRequest } from '../api'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart>()

  async function fetchCart() {
    try {
      const res = await fetchUsersCart()
      cart.value = res.data
    } catch (error) {
      throw error
    }
  }

  async function updateProductQuantity(dto: CartItem) {
    try {
      await updateProductQuantityRequest(dto)
      await fetchCart()
    } catch (error) {
      throw error
    }
  }

  return { cart, fetchCart, updateProductQuantity }
})
