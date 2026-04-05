<template>
  <div class="checkout">
    <h1 class="title">Итого</h1>

    <div v-for="item in cartStore.products" :key="item.product.id" class="item">
      <p class="name">{{ item.product.name }}</p>
      <p class="quantity">{{ item.quantity }} шт.</p>
      <p class="price">{{ (item.product.price * item.quantity) / 100 }} ₽</p>
    </div>

    <h2 class="total">Сумма: {{ cartStore.totalSum / 100 }} ₽</h2>

    <app-button class="btn">Перейти к оформлению</app-button>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import AppButton from '@/shared/ui/AppButton/AppButton.vue'

const cartStore = useCartStore()
</script>

<style scoped lang="scss">
.checkout {
  padding: 30px;
  height: 100%;

  background-color: #fff;
  border-radius: 15px;

  .title {
    @include mixins.text(22px);
    font-weight: 600;
  }

  .item {
    display: flex;
    align-items: center;

    margin-top: 25px;
    gap: 20px;

    @include mixins.text(16px);

    .name {
      width: 60%;
    }

    .quantity {
      width: 20%;
      text-align: center;
    }

    .price {
      width: 20%;
      text-align: right;
    }
  }

  .total {
    @include mixins.text(22px);

    margin-top: 25px;
    font-weight: 600;
  }

  .btn {
    margin-top: 25px;
  }
}
</style>
