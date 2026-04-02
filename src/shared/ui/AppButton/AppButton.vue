<template>
  <button class="app-button"><slot></slot></button>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.app-button {
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
}

.app-button:hover {
  background-color: variables.$color-accent-hover;
}
</style>
