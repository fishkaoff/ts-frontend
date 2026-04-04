<template>
  <div class="products-list">
    <search-product></search-product>

    <product-card
      class="product-item"
      v-for="product in productsStore.products"
      :product="product"
      :in-cart="isInCart(product)"
      @add-to-cart="addToCart(product)"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import type { CartItem } from '@/entities/cart/model/types'
import { useProductsStore } from '@/entities/products/model/store'
import type { Product } from '@/entities/products/model/types'
import ProductCard from '@/entities/products/ui/ProductCard.vue'
import { useAddToCart } from '@/features/add-to-cart/model/useAddToCart'
import SearchProduct from '@/features/search-products/ui/SearchProduct.vue'
import router from '@/router'
import { AppError } from '@/shared/app-error/app-error'

const productsStore = useProductsStore()
const cartStore = useCartStore()
const { add, isLoading, cartError } = useAddToCart()

const isInCart = (product: Product) => {
  if (!cartStore.cart) return false

  return cartStore.cart.products.some((item: CartItem) => item.product_id === product.id)
}

const addToCart = async (product: Product) => {
  try {
    await add({
      product_id: product.id,
      quantity: 1,
    } as CartItem)
  } catch (error) {
    if (error instanceof AppError) {
      if (error.code == 401) {
        router.push({ name: 'LoginView' })
      }
    }
  }
}
</script>

<style scoped lang="scss">
.products-list {
  @include mixins.container;

  .product-item:not(:first-of-type) {
    margin-top: 20px;
  }
}
</style>
