<template>
  <div class="profile">
    <h1>Профиль</h1>
    <h2>Email: {{ authStore.user?.email }}</h2>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth/model/store'

const authStore = useAuthStore()
</script>

<style scoped lang="scss">
.profile {
  margin-top: 130px;
}
</style>
