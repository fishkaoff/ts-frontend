<template>
  <div class="cart">
    <h1 class="page-title">Корзина</h1>

    <cart-list class="items" />
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import router from '@/router'
import { AppError } from '@/shared/app-error/app-error'
import cartList from '@/widgets/cart-list/cart-list.vue'
import { onBeforeMount } from 'vue'
const cartStore = useCartStore()

onBeforeMount(async () => {
  try {
    await cartStore.fetchCart()
  } catch (error) {
    if (error instanceof AppError) {
      if (error.code == 401) {
        router.push({ name: 'LoginView' })
      }
    }
  }
})
</script>

<style scoped lang="scss">
.cart {
  margin-top: 130px;

  .page-title {
    @include mixins.container;
    @include mixins.title(36px);
  }

  .items {
    margin-top: 30px;
  }
}
</style>
