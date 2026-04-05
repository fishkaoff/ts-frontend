<template>
  <div class="profile"></div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth/model/store'
import { onMounted } from 'vue'

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.loadUserInfo()
})
</script>

<style scoped lang="scss">
.profile {
  margin-top: 130px;
}
</style>
