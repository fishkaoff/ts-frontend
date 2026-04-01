<template>
  <div class="products-list">
    <div class="product-item" v-for="product in products" :key="product.id">
      <div class="content">
        <p class="part-number">{{ product.part_number }}</p>

        <div class="part-info">
          <h2 class="name">{{ product.name }}</h2>
          <p class="info-item">Остаток: {{ product.balance }}</p>
          <p class="info-item">Производитель: {{ product.manufacturer }}</p>
          <p class="info-item">Ед. Измерения: {{ product.unit }}</p>
          <p class="info-item price">Цена: {{ product.price / 100 }} ₽</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/products/model/types'

defineProps<{
  products: Product[]
}>()
</script>

<style scoped lang="scss">
.products-list {
  @include mixins.container;

  .product-item {
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
        .name {
          @include mixins.title(22px);
        }

        .info-item {
          @include mixins.text;
          margin-top: 15px;
        }

        .price {
          font-size: 18px;
          font-weight: 600;
        }
      }
    }
  }

  .product-item:not(:first-of-type) {
    margin-top: 20px;
  }
}
</style>
