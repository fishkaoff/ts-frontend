<template>
  <div class="products-list">
    <product-card class="product-item" v-for="product in products" :product="product" />
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/products/model/types'
import ProductCard from './ProductCard.vue'

defineProps<{
  products: Product[]
}>()
</script>

<style scoped lang="scss">
.products-list {
  @include mixins.container;

  .product-item:not(:first-of-type) {
    margin-top: 20px;
  }
}
</style>
