<template>
  <div class="product-card">
    <div class="content">
      <div class="part-info">
        <h2 class="name">{{ product.name }}</h2>
        <p class="info-item">Артикул: {{ product.part_number }}</p>
        <p class="info-item">Остаток: {{ product.balance }}</p>
        <p class="info-item">Производитель: {{ product.manufacturer }}</p>
        <p class="info-item">Ед. Измерения: {{ product.unit }}</p>

        <div class="bottom">
          <p class="price">Цена: {{ product.price / 100 }} ₽</p>

          <div class="btns" v-if="!isLoading">
            <app-button v-if="!inCart" class="btn" @click="addToCart"
              >Добавить в корзину</app-button
            >
            <button v-else @click="removeFromCart" class="bordered-btn btn">
              Убрать из корзины
            </button>
          </div>

          <base-loader v-else></base-loader>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Product } from '@/entities/products/model/types'
import AppButton from '@/shared/ui/AppButton/AppButton.vue'
import BaseLoader from '@/shared/ui/BaseLoader/BaseLoader.vue'

const props = defineProps<{
  product: Product
  inCart: boolean
  isLoading: boolean
}>()

const emit = defineEmits(['add-to-cart', 'remove-from-cart'])

const addToCart = () => {
  emit('add-to-cart', props.product)
}

const removeFromCart = () => {
  emit('remove-from-cart', props.product)
}
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

        @media screen and (max-width: 710px) {
          display: block;
          margin-top: 25px;
        }

        .price {
          @include mixins.text;
          margin-top: 15px;

          font-size: 22px;
          font-weight: 600;
        }

        .btn {
          @media screen and (max-width: 710px) {
            margin-top: 25px;
          }
        }

        .bordered-btn {
          cursor: pointer;
          outline: none;
          border: none;
          height: 100%;

          padding: 20px;

          background-color: #fff;
          border-radius: 7px;
          border: 1px solid variables.$color-accent;

          @include mixins.text(18px);
          color: variables.$color-accent;
          transition: all 0.2s;
        }

        .bordered-btn:hover {
          background-color: variables.$color-accent;
          color: #fff;
        }
      }
    }
  }
}
</style>
