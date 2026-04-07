<script setup lang="ts">
import { RouterView } from 'vue-router'
import AppHeader from '@/widgets/app-header/AppHeader.vue'
import { onBeforeMount } from 'vue'
import { useProductsStore } from './entities/products/model/store'
import appFooter from './widgets/app-footer/app-footer.vue'

onBeforeMount(async () => {
  const productsStore = useProductsStore()

  try {
    productsStore.loadProducts({
      limit: 200,
      offset: 0,
    })
  } catch (error) {}
})
</script>

<template>
  <app-header></app-header>
  <router-view></router-view>
  <app-footer></app-footer>
</template>

<style scoped></style>
