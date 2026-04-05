<template>
  <div class="cart-item">
    <img :src="item.product.image_url" class="image" />

    <div class="chars">
      <h1 class="name">{{ item.product.name }}</h1>
      <p class="char">Артикул: {{ item.product.part_number }}</p>
      <p class="char">Производитель: {{ item.product.manufacturer }}</p>
      <p class="char">Ед. Измерения: {{ item.product.unit }}</p>
      <p class="char">Остаток: {{ item.product.balance }}</p>
    </div>

    <div class="actions">
      <div class="count">
        <base-loader v-if="decreasingId == item.product.id" />
        <change-count-button v-else :disable="item.quantity <= 1" @click="$emit('decrease')"
          >-</change-count-button
        >

        <span>{{ item.quantity }}</span>

        <base-loader v-if="increasingId == item.product.id" />
        <change-count-button
          v-else
          :disable="item.quantity >= item.product.balance"
          @click="$emit('increase')"
          >+</change-count-button
        >
      </div>

      <h2 class="price">{{ item.product.price / 100 }} ₽</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/products/model/types'
import ChangeCountButton from '@/shared/ui/ChangeCountButton/ChangeCountButton.vue'
import BaseLoader from '@/shared/ui/BaseLoader/BaseLoader.vue'

defineProps<{
  item: {
    product: Product
    quantity: number
  }
  decreasingId: string
  increasingId: string
}>()

defineEmits<{
  (e: 'increase'): void
  (e: 'decrease'): void
}>()
</script>

<style scoped lang="scss">
.cart-item {
  display: flex;
  flex-wrap: nowrap;

  gap: 30px;
  padding: 30px;

  background-color: #fff;
  border-radius: 15px;

  .image {
    flex: 1;
    min-width: 100px;
    max-width: 200px;

    height: auto;
    border-radius: 15px;
  }

  .chars {
    flex: 1;
    min-width: 200px;
    max-width: 400px;

    .name {
      @include mixins.title(18px);
    }

    .char {
      @include mixins.text(16px);
      margin-top: 15px;
    }
  }

  .actions {
    display: flex;
    flex-direction: column;

    justify-content: space-between;
    align-items: end;

    .count {
      display: flex;
      align-items: center;
      gap: 20px;

      span {
        @include mixins.text(18px);
      }
    }

    .price {
      @include mixins.text(18px);
      font-weight: 800;
      color: #ff0000;
      letter-spacing: 2px;
    }
  }
}
</style>
