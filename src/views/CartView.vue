<template>
  <div class="cart">
    <h1 class="page-title">Корзина</h1>

    <cart-list />
  </div>
</template>

<script setup lang="ts">
import cartList from '@/widgets/cart-list/cart-list.vue'
</script>

<style scoped lang="scss">
.cart {
  margin-top: 130px;

  .page-title {
    @include mixins.container;
    @include mixins.title(36px);
  }
}
</style>
