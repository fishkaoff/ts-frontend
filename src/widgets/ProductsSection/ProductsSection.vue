<template>
  <div class="products-section">
    <search-product />

    <products-list :products="productsStore.products" class="list" />
  </div>
</template>

<script setup lang="ts">
import { useProductsStore } from '@/entities/products/model/store'
import SearchProduct from '@/features/SearchProduct/ui/SearchProduct.vue'
import ProductsList from '@/shared/ui/ProductsList/ProductsList.vue'

const productsStore = useProductsStore()
</script>

<style scoped lang="scss">
.products-section {
  .list {
    margin-top: 30px;
  }
}
</style>
