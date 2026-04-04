import { useCartStore } from '@/entities/cart/model/store'
import type { CartItem } from '@/entities/cart/model/types'
import { ref } from 'vue'

export const useAddToCart = () => {
  const isLoading = ref(false)
  const cartError = ref('')

  const cartStore = useCartStore()

  const add = async (dto: CartItem) => {
    cartError.value = ''
    isLoading.value = true
    try {
      await cartStore.updateProductQuantity(dto)
    } catch (error: any) {
      console.error('useAddToCart', error)
      cartError.value = error.message
      throw error
    } finally {
      isLoading.value = false
    }
  }

  return {
    isLoading,
    cartError,
    add,
  }
}
