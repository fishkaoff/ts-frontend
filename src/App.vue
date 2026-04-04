<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/widgets/app-header/AppHeader.vue'
import { onBeforeMount } from 'vue'
import { useProductsStore } from './entities/products/model/store'
import { useCartStore } from './entities/cart/model/store'

onBeforeMount(async () => {
  const productsStore = useProductsStore()
  const cartStore = useCartStore()

  try {
    productsStore.loadProducts({
      limit: 200,
      offset: 0,
    })

    await cartStore.fetchCart()
  } catch (error) {}
})
</script>

<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<style scoped></style>
