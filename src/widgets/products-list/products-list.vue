<template>
  <div class="products-list">
    <product-card
      v-for="product in products"
      class="product-item"
      :key="product.id"
      :product="product"
      :in-cart="cartStore.isInCart(product.id).value"
      :is-loading="loadingId === product.id"
      @add-to-cart="onAddToCart"
      @remove-from-cart="onRemoveFromCart"
    />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import ProductCard from '@/entities/products/ui/ProductCard.vue'
import type { Product } from '@/entities/products/model/types'
import { ref } from 'vue'

defineProps<{
  products: Product[]
}>()

const cartStore = useCartStore()

const loadingId = ref<string>('')

const onAddToCart = async (product: Product) => {
  loadingId.value = product.id

  try {
    await cartStore.updateProductQuantity({
      product_id: product.id,
      quantity: 1,
    })
  } finally {
    loadingId.value = ''
  }
}

const onRemoveFromCart = async (product: Product) => {
  loadingId.value = product.id

  try {
    await cartStore.updateProductQuantity({
      product_id: product.id,
      quantity: 0,
    })
  } finally {
    loadingId.value = ''
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
