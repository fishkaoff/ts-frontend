import HomeView from '@/views/HomeView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import RegisterView from '@/views/RegisterView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '@/entities/auth/model/store'
import { storeToRefs } from 'pinia'
import CartView from '@/views/CartView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'HomeView',
      component: HomeView,
    },
    {
      path: '/login',
      name: 'LoginView',
      component: LoginView,
      meta: { guestOnly: true },
    },
    {
      path: '/register',
      name: 'RegisterView',
      component: RegisterView,
      meta: { guestOnly: true },
    },
    {
      path: '/profile',
      name: 'ProfileView',
      component: ProfileView,
      meta: { requiresAuth: true },
    },
    {
      path: '/cart',
      name: 'CartView',
      component: CartView,
      meta: { requiresAuth: true },
    },
  ],
})

router.beforeEach(async (to) => {
  const authStore = useAuthStore()
  const { isAuthorized, isAuthChecked } = storeToRefs(authStore)

  //  проверяем токен
  if (!isAuthChecked.value) {
    await authStore.initAuth()
  }

  // если нужна авторизация
  if (to.meta.requiresAuth && !isAuthorized.value) {
    return { name: 'LoginView' }
  }

  // если гость, но уже залогинен
  if (to.meta.guestOnly && isAuthorized.value) {
    return { name: 'ProfileView' }
  }
})

export default router
