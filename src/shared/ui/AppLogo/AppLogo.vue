<template>
  <div class="app-logo" @click="$router.push({ name: 'HomeView' })">
    <p class="logo-icon">ТС</p>
    <h1 class="logo-text">ТехноСервис</h1>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-logo {
  display: flex;
  align-items: center;
  gap: 20px;

  cursor: pointer;

  .logo-icon {
    @include mixins.title;

    padding: 15px;
    border-radius: 10px;

    background-color: variables.$color-accent;
    color: #fff;

    @media screen and (max-width: 320px) {
      display: none;
    }
  }

  .logo-text {
    @include mixins.title;
  }
}
</style>
