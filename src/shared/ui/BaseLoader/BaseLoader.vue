<template>
  <div class="loader">
    <div class="spinner"></div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped lang="scss">
.loader {
  display: flex;
  justify-content: center;
  align-items: center;

  .spinner {
    width: 20px;
    height: 20px;
    border: 4px solid #f3f3f3;
    border-top: 4px solid variables.$color-accent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
