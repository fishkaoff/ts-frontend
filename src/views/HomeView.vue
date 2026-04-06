<template>
  <section class="start">
    <search-product />

    <products-list :products="productsStore.products" class="list" />
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import ProductsList from '@/widgets/products-list/products-list.vue'
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

  .list {
    margin-top: 40px;
  }
}
</style>
