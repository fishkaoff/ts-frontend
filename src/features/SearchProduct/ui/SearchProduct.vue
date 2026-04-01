<template>
  <div class="search-box">
    <div class="container">
      <div class="card">
        <div class="content">
          <h1 class="title">Поиск запчасти по названию</h1>
          <div class="search">
            <search-input placeholder="104538" v-model="partName" class="search-field" />
            <search-button class="search-button" />
          </div>
        </div>
      </div>

      <div class="card">
        <div class="content">
          <h1 class="title">Поиск запчасти по артикулу</h1>
          <div class="search">
            <search-input placeholder="104538" v-model="partNumber" class="search-field" />
            <search-button class="search-button" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from './SearchInput.vue'
import SearchButton from './SearchButton.vue'

const partName = ref('')
const partNumber = ref('')
</script>

<style scoped lang="scss">
.search-box {
  .container {
    @include mixins.container;

    display: flex;
    gap: 30px;
    flex-wrap: wrap;

    .card {
      flex: 1;
      min-width: 300px;

      background-color: #fff;
      border-radius: 15px;

      .content {
        padding: 30px;

        .title {
          @include mixins.title(20px);
        }

        .search {
          display: flex;
          align-items: end;
          gap: 20px;

          .search-field {
            margin-top: 30px;
          }
        }
      }
    }
  }
}

@media screen and (max-width: mixins.$s) {
  .search-box {
    .container {
      .card {
        min-width: 100%;
      }
    }
  }
}
</style>
