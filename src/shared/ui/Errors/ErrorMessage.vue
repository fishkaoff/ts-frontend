<template>
  <p class="error"><slot></slot></p>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.error {
  @include mixins.text(16px);
  color: #ff0000;
}
</style>
