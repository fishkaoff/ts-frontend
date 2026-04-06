<template>
  <div class="profile-controls">
    <div class="controls">
      <h1 class="name">
        {{ authStore.user?.name }}
        <span class="email">{{ authStore.user?.email }}</span>
      </h1>

      <ul class="tab-selectors">
        <li class="selector" @click="setActiveTab(0)">Заказы</li>
        <li class="selector" @click="setActiveTab(1)">Возвраты</li>
        <li class="selector" @click="setActiveTab(2)">Настройки</li>
        <li class="selector logout" @click="logout">Выход</li>
      </ul>
    </div>

    <div v-if="activeTab == 0" class="tab orders">
      <h1 class="tab-title">Заказы</h1>
      <h2 class="no-active">Нет активных заказов...</h2>
    </div>

    <div v-if="activeTab == 1" class="tab refunds">
      <h1 class="tab-title">Возвраты</h1>
      <h2 class="no-active">Возвраты не найдены...</h2>
    </div>

    <div v-if="activeTab == 2" class="tab settings">
      <h1 class="tab-title">Настройки</h1>
      <h2 class="no-active">Этот раздел пока в разработке...</h2>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/entities/auth/model/store'
import { ref } from 'vue'

const activeTab = ref(0)
const authStore = useAuthStore()

const setActiveTab = (id: number) => {
  activeTab.value = id
}

const logout = () => {
  localStorage.removeItem('ts-access-token')
  window.location.reload()
}
</script>

<style scoped lang="scss">
.profile-controls {
  @include mixins.container;
  display: flex;
  flex-wrap: wrap;
  gap: 30px;

  .controls {
    flex: 1;
    padding: 20px;

    max-width: 400px;
    min-width: 200px;

    background-color: #fff;
    border-radius: 15px;

    .name {
      @include mixins.title(26px);
      text-transform: uppercase;

      .email {
        font-size: 14px;
        color: variables.$color-fg;
        text-transform: none;
      }
    }

    .tab-selectors {
      .selector {
        @include mixins.text(16px);
        margin-top: 15px;

        cursor: pointer;
        transition: all 0.3s;

        &.logout {
          color: #ff0000;
        }

        &.logout:hover {
          color: #761515;
        }
      }

      .selector:hover {
        color: variables.$color-accent;
      }
    }
  }

  .tab {
    flex: 1;
    background-color: #fff;

    padding: 20px;
    border-radius: 15px;

    .tab-title {
      @include mixins.title(26px);
    }

    .no-active {
      @include mixins.text(44px);
      color: variables.$color-fg;
      text-align: center;
      margin-top: 50px;
    }
  }
}
</style>
