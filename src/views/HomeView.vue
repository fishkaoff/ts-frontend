<template>
  <section class="start">
    <products-list />
  </section>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import ProductsList from '@/widgets/products-list/products-list.vue'
import { onBeforeMount } from 'vue'

const cartStore = useCartStore()

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
