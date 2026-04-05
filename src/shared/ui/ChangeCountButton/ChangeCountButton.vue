<template>
  <button :disabled="disable" :class="disable ? 'btn disable' : 'btn'"><slot></slot></button>
</template>

<script setup lang="ts">
defineProps<{
  disable: boolean
}>()
</script>

<style scoped lang="scss">
.btn {
  outline: none;
  border: none;

  font-size: 18px;
  border-radius: 7px;

  background-color: #fff;
  border: 1px solid variables.$color-accent;

  cursor: pointer;
  width: 30px;
  height: 30px;

  &.disable {
    background-color: #e0e0e0 !important;
    cursor: default !important;
  }
}
</style>
