<template>
  <button class="search-button">
    <p class="text">Искать</p>
    <img :src="SearchIcon" alt="" class="icon" />
  </button>
</template>

<script setup lang="ts">
import SearchIcon from '@/assets/images/search-icon.svg'
</script>

<style scoped lang="scss">
.search-button {
  outline: none;
  border: none;
  height: 100%;

  display: flex;
  align-items: center;

  gap: 10px;
  padding: 20px;

  background-color: variables.$color-accent;
  border-radius: 7px;

  .icon {
    color: #fff;
  }

  .text {
    @include mixins.text(18px);
    color: #fff;
  }
}
</style>
