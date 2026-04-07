<template>
  <div class="footer">
    <div class="container">
      <div class="col">
        <app-logo></app-logo>
      </div>

      <div class="col">
        <h1 class="items-title">Контакты</h1>
        <ul class="items">
          <li class="item">Телефон: 8 (999) 987-99-00</li>
          <li class="item">Email: info@ts.ru</li>
        </ul>
      </div>

      <div class="col">
        <h1 class="items-title">Документы</h1>
        <ul class="items">
          <li class="item">
            <router-link :to="{ name: '' }" class="link">Политика конфиденциальности</router-link>
          </li>
          <li class="item">
            <router-link :to="{ name: '' }" class="link">Согласие на обработку ПД</router-link>
          </li>
          <li class="item">
            <router-link :to="{ name: '' }" class="link">Пользовательское соглашения</router-link>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppLogo from '@/shared/ui/AppLogo/AppLogo.vue'
</script>

<style scoped lang="scss">
.footer {
  margin-top: 50px;
  background-color: #fff;

  .container {
    @include mixins.container;
    padding: 40px;

    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    @media screen and (max-width: 320px) {
      padding: 20px;
    }

    .col {
      max-width: 300px;
      min-width: 250px;

      @media screen and (max-width: 708px) {
        margin-top: 30px;
      }

      @media screen and (max-width: 250px) {
        min-width: 100%;
      }

      .items-title {
        @include mixins.title(22px);

        @media screen and (max-width: 320px) {
          font-size: 20px;
        }
      }

      .items {
        .item {
          @include mixins.text(18px);
          margin-top: 15px;

          @media screen and (max-width: 320px) {
            font-size: 16px;
            word-wrap: break-word;
          }

          .link {
            color: variables.$color-accent;
          }
        }
      }
    }
  }
}
</style>
