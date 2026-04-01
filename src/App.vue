<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/widgets/AppHeader/AppHeader.vue'
import { onBeforeMount } from 'vue'
import { useProductsStore } from './entities/products/model/store'

onBeforeMount(async () => {
  const productsStore = useProductsStore()
  productsStore.loadProducts({
    limit: 200,
    offset: 0,
  })
})
</script>

<template>
  <app-header></app-header>
  <router-view></router-view>
</template>

<style scoped></style>
