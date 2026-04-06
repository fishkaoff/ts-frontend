<template>
  <div class="profile">
    <profile-controls />
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth/model/store'
import { onMounted } from 'vue'
import ProfileControls from '@/widgets/profile-controls/ProfileControls.vue'

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
