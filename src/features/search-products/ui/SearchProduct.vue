<template>
  <div class="search-box">
    <div class="container">
      <div class="search-field">
        <h1 class="title">Поиск запчасти по названию/номеру</h1>

        <div class="search">
          <search-input placeholder="Подшипник / 123984" v-model="query" class="search-input" />
        </div>
      </div>

      <div class="products-list">
        <product-card
          v-for="product in productsInUse"
          class="product-item"
          :key="product.id"
          :product="product"
          :in-cart="cartStore.isInCart(product.id).value"
          :is-loading="loadingId === product.id"
          @add-to-cart="onAddToCart"
          @remove-from-cart="onRemoveFromCart"
        />
      </div>

      <div class="pagination">
        <button :disabled="page === 1" @click="prevPage">Назад</button>

        <span>Страница {{ page }}</span>

        <button :disabled="isLastPage" @click="nextPage">Вперед</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, computed } from 'vue'
import SearchInput from './SearchInput.vue'
import ProductCard from '@/entities/products/ui/ProductCard.vue'
import { useCartStore } from '@/entities/cart/model/store'
import { useProductsStore } from '@/entities/products/model/store'
import type { Product } from '@/entities/products/model/types'
import { debounce } from '@/shared/helpers'

const cartStore = useCartStore()
const productsStore = useProductsStore()

const productsInUse = ref()

const query = ref('')
const loadingId = ref<string>('')

const page = ref(1)
const limit = ref(10)

const isLastPage = ref(false)

const loadData = async () => {
  try {
    const offset = (page.value - 1) * limit.value

    if (!query.value.trim()) {
      productsInUse.value = await productsStore.loadProducts({
        offset: offset,
        limit: limit.value,
      })
    } else {
      productsInUse.value = await productsStore.searchProducts(query.value, page.value, limit.value)
    }

    isLastPage.value = productsInUse.value.length < limit.value
  } catch (e) {
    console.error(e)
  }
}

const debouncedSearch = debounce(() => {
  page.value = 1
  loadData()
}, 300)

watch(query, () => {
  debouncedSearch()
})

watch(page, () => {
  loadData()
  scrollToTop()
})

onMounted(() => {
  loadData()
})

const nextPage = () => {
  if (!isLastPage.value) {
    page.value++
  }
}

const prevPage = () => {
  if (page.value > 1) {
    page.value--
  }
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth',
  })
}

const onAddToCart = async (product: Product) => {
  loadingId.value = product.id

  try {
    await cartStore.updateProductQuantity({
      product_id: product.id,
      quantity: 1,
    })
  } finally {
    loadingId.value = ''
  }
}

const onRemoveFromCart = async (product: Product) => {
  loadingId.value = product.id

  try {
    await cartStore.updateProductQuantity({
      product_id: product.id,
      quantity: 0,
    })
  } finally {
    loadingId.value = ''
  }
}
</script>

<style scoped lang="scss">
.search-box {
  .container {
    @include mixins.container;

    .search-field {
      background-color: #fff;
      border-radius: 15px;
      padding: 30px;

      .title {
        @include mixins.title(20px);
      }

      .search {
        display: flex;
        align-items: end;
        gap: 20px;

        .search-input {
          margin-top: 30px;
        }
      }
    }

    .products-list {
      margin-top: 40px;

      .product-item:not(:first-of-type) {
        margin-top: 20px;
      }
    }

    .pagination {
      margin-top: 30px;
      display: flex;
      gap: 15px;

      @include mixins.text(18px);
      justify-content: center;
      align-items: center;

      button {
        cursor: pointer;
        outline: none;
        border: none;
        height: 100%;

        padding: 20px;

        background-color: variables.$color-accent;
        border-radius: 7px;

        @include mixins.text(18px);
        color: #fff;
        transition: all 0.2s;

        &:disabled {
          background-color: #7c7c7c;
          cursor: default;
        }
      }

      button:hover {
        background-color: variables.$color-accent-hover;
      }
    }
  }
}
</style>
