// entities/cart/model/store.ts
import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { Cart } from './types'
import { fetchUsersCart, updateProductQuantityRequest } from '../api'
import { AppError } from '@/shared/app-error/app-error'
import router from '@/router'

export const useCartStore = defineStore('cart', () => {
  const cart = ref<Cart | null>(null)
  const isLoading = ref(false)

  const products = computed(() => cart.value?.products || [])

  const totalSum = computed(() => {
    return products.value.reduce((sum, item) => {
      return sum + item.product.price * item.quantity
    }, 0)
  })

  const isInCart = (productId: string) => {
    return computed(() => products.value.some((item) => item.product.id === productId))
  }

  async function fetchCart() {
    isLoading.value = true
    try {
      const res = await fetchUsersCart()
      cart.value = res.data
    } finally {
      isLoading.value = false
    }
  }

  async function updateProductQuantity(dto: { product_id: string; quantity: number }) {
    try {
      await updateProductQuantityRequest(dto)
      await fetchCart()
    } catch (error) {
      if (error instanceof AppError) {
        if (error.code === 401) {
          router.push({ name: 'LoginView' })
        }
      }
    }
  }

  return {
    cart,
    products,
    totalSum,
    isLoading,
    fetchCart,
    updateProductQuantity,
    isInCart,
  }
})
