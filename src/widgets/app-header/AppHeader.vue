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
          <img
            :src="CartIcon"
            alt="Корзина"
            title="Корзина"
            class="icon"
            @click="$router.push({ name: 'CartView' })"
          />
        </div>
        <div class="profile" @click="$router.push({ name: 'ProfileView' })">
          <img :src="ProfileIcon" alt="Профиль" title="Профиль" class="icon" />
        </div>
      </div>

      <transition name="burger">
        <div v-if="isOpen" class="burger">
          <div class="content">
            <div class="btn-container">
              <img
                v-if="isOpen"
                :src="CancelIcon"
                alt="Скрыть меню"
                class="burger-btn-close"
                @click="isOpen = !isOpen"
              />
            </div>

            <nav class="burger-nav">
              <ul class="burger-nav-list">
                <li class="burger-nav-item" v-for="navItem in NavData" :key="navItem.name">
                  <router-link
                    @click="isOpen = false"
                    :to="{ name: navItem.componentName }"
                    class="burger-nav-link"
                    >{{ navItem.name }}</router-link
                  >
                </li>
                <li class="burger-nav-item">
                  <router-link
                    @click="isOpen = false"
                    :to="{ name: 'ProfileView' }"
                    class="burger-nav-link"
                    >Профиль</router-link
                  >
                </li>
                <li class="burger-nav-item">
                  <router-link
                    @click="isOpen = false"
                    :to="{ name: 'CartView' }"
                    class="burger-nav-link"
                    >Корзина</router-link
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </transition>

      <img
        v-if="!isOpen"
        :src="BurgerIcon"
        alt="Открыть меню"
        class="burger-btn"
        @click="isOpen = !isOpen"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { NavData } from '@/shared/data/navigation'
import AppLogo from '@/shared/ui/AppLogo/AppLogo.vue'
import { RouterLink } from 'vue-router'

import ProfileIcon from '@/assets/images/profile-icon.svg'
import CartIcon from '@/assets/images/cart-icon.svg'
import BurgerIcon from '@/assets/images/burger-icon.svg'
import CancelIcon from '@/assets/images/cancel-icon.svg'
import { ref } from 'vue'

const isOpen = ref(false)
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

      @media screen and (max-width: 944px) {
        display: none;
      }

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

      @media screen and (max-width: 944px) {
        display: none;
      }

      .profile .icon,
      .cart .icon {
        width: 30px;
        height: 30px;

        cursor: pointer;
      }
    }

    .burger-btn {
      display: none;

      @media screen and (max-width: 944px) {
        display: block;
      }
    }

    .burger {
      position: fixed;
      right: 0;
      top: 0;

      height: 100vh;
      width: 60%;

      background-color: #fff;

      @media screen and (max-width: 350px) {
        width: 100%;
      }

      .content {
        padding: 30px;

        .btn-container {
          display: flex;
          justify-content: end;

          .burger-btn-close {
            width: 30px;
            height: 30px;
          }
        }

        .burger-nav .burger-nav-list {
          .burger-nav-item {
            margin-top: 20px;

            .burger-nav-link {
              @include mixins.text(1.4rem);
              color: #000;
            }
          }
        }
      }
    }
  }
}

.burger-enter-active,
.burger-leave-active {
  transition: all 0.3s ease;
}

.burger-enter-from,
.burger-leave-to {
  transform: translateX(100%);
  opacity: 0;
}

.burger-enter-to,
.burger-leave-from {
  transform: translateX(0);
  opacity: 1;
}
</style>
