<template>
  <div class="header">
    <div class="container">
      <app-logo />

      <nav class="nav">
        <ul class="nav-list">
          <li class="nav-item" v-for="navItem in NavData" :key="navItem.name">
            <router-link :to="{ name: navItem.componentName }" class="nav-link">{{
              navItem.name
            }}</router-link>
          </li>
        </ul>
      </nav>

      <div class="controls">
        <div class="cart">
          <img :src="CartIcon" alt="Корзина" title="Корзина" class="icon" />
        </div>
        <div class="profile">
          <img :src="ProfileIcon" alt="Корзина" title="Корзина" class="icon" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavData } from '@/shared/data/navigation'
import AppLogo from '@/shared/ui/AppLogo/AppLogo.vue'
import { RouterLink } from 'vue-router'

import ProfileIcon from '@/assets/images/profile-icon.svg'
import CartIcon from '@/assets/images/cart-icon.svg'
</script>

<style scoped lang="scss">
.header {
  position: fixed;
  width: 100%;
  top: 0;

  background-color: #fff;

  .container {
    @include mixins.container;

    padding-top: 20px;
    padding-bottom: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    .nav .nav-list {
      display: flex;
      gap: 60px;

      .nav-item .nav-link {
        @include mixins.text(18px);
        color: #000;

        transition: all 0.2s;
      }

      .nav-item .nav-link:hover {
        color: variables.$color-accent;
      }
    }

    .controls {
      display: flex;
      gap: 20px;

      .profile .icon,
      .cart .icon {
        width: 30px;
        height: 30px;

        cursor: pointer;
      }
    }
  }
}
</style>
