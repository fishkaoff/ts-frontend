<template>
  <div class="product-card">
    <div class="content">
      <p class="part-number">{{ product.part_number }}</p>

      <div class="part-info">
        <h2 class="name">{{ product.name }}</h2>
        <p class="info-item">Остаток: {{ product.balance }}</p>
        <p class="info-item">Производитель: {{ product.manufacturer }}</p>
        <p class="info-item">Ед. Измерения: {{ product.unit }}</p>

        <div class="bottom">
          <p class="price">Цена: {{ product.price / 100 }} ₽</p>
          <app-button class="add-btn">Добавить в корзину</app-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/products/model/types'
import AppButton from '../AppButton/AppButton.vue'

defineProps<{
  product: Product
}>()
</script>

<style scoped lang="scss">
.product-card {
  background-color: #fff;
  border-radius: 15px;

  .content {
    padding: 30px;

    display: flex;
    align-items: center;
    gap: 20px;

    .part-number {
      @include mixins.text(14px);
    }

    .part-info {
      width: 100%;

      .name {
        @include mixins.title(22px);
      }

      .info-item {
        @include mixins.text;
        margin-top: 15px;
      }

      .bottom {
        display: flex;
        justify-content: space-between;
        align-items: center;

        .price {
          @include mixins.text;
          margin-top: 15px;

          font-size: 22px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>
