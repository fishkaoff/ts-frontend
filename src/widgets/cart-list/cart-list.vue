<template>
  <div class="cart-list">
    <div class="cart-items">
      <cart-item-card
        v-for="item in cartStore.products"
        :key="item.product.id"
        :item="item"
        class="item"
        @increase="increase(item)"
        @decrease="decrease(item)"
        :increasing-id="increasingId"
        :decreasing-id="decreasingId"
      />
    </div>

    <checkout class="checkout" />
  </div>
  <div class="mobile-checkout">
    <div class="container">
      <div class="info">
        <p class="total">{{ cartStore.products.length }} товаров</p>
        <p class="price">{{ cartStore.totalSum / 100 }} ₽</p>
      </div>

      <app-button class="button">Перейти к оформлению</app-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/entities/cart/model/store'
import CartItemCard from './cart-item-card.vue'
import { onMounted, ref } from 'vue'
import type { CartItem } from '@/entities/cart/model/types'
import checkout from './checkout.vue'
import AppButton from '@/shared/ui/AppButton/AppButton.vue'

const cartStore = useCartStore()
const decreasingId = ref('')
const increasingId = ref('')

onMounted(() => {
  cartStore.fetchCart()
})

const increase = async (item: CartItem) => {
  increasingId.value = item.product.id

  try {
    await cartStore.updateProductQuantity({
      product_id: item.product.id,
      quantity: item.quantity + 1,
    })
  } finally {
    increasingId.value = ''
  }
}

const decrease = async (item: CartItem) => {
  decreasingId.value = item.product.id

  try {
    if (item.quantity - 1 <= 0) return

    await cartStore.updateProductQuantity({
      product_id: item.product.id,
      quantity: item.quantity - 1,
    })
  } finally {
    decreasingId.value = ''
  }
}
</script>

<style scoped lang="scss">
.cart-list {
  @include mixins.container;

  display: flex;
  gap: 40px;
  justify-content: space-between;

  .cart-items {
    flex: 1;
    min-width: 600px;
    margin-top: 20px;

    @media screen and (max-width: 600px) {
      min-width: 100%;
    }
    .item:not(:first-of-type) {
      margin-top: 25px;
    }
  }

  .checkout {
    flex: 1;
    max-width: 500px;
    min-width: 400px;
    margin-top: 20px;

    @media screen and (max-width: 1300px) {
      display: none;
    }
  }
}

.mobile-checkout {
  display: none;

  position: fixed;
  bottom: 0;

  width: 100%;
  background-color: #fff;

  @media screen and (max-width: 1300px) {
    display: block;
  }

  .container {
    @include mixins.container;
    padding: 15px;

    .info {
      display: flex;
      justify-content: space-between;

      @include mixins.text(16px);

      .total {
        color: variables.$color-fg;
      }
    }

    .button {
      width: 100%;
      margin-top: 15px;
    }
  }
}
</style>
