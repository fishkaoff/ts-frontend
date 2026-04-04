<template>
  <div class="cart-list">
    <div class="cart-item" v-for="cartItem in cartStore.cart?.products" :key="cartItem.product_id">
      <h1>id: {{ cartItem.product_id }}</h1>
      <h1>quantity: {{ cartItem.quantity }}</h1>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
.cart-list {
  @include mixins.container;
}
</style>
