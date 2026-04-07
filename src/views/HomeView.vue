<template>
  <section class="start">
    <search-product />
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import SearchProduct from '@/features/search-products/ui/SearchProduct.vue'
import { onBeforeMount } from 'vue'
import { useProductsStore } from '@/entities/products/model/store'

const cartStore = useCartStore()
const productsStore = useProductsStore()

onBeforeMount(async () => {
  try {
    await cartStore.fetchCart()
  } catch (error) {}
})
</script>

<style scoped lang="scss">
.start {
  margin-top: 140px;
}
</style>
