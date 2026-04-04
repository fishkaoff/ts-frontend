import { useAuthStore } from '@/entities/auth/model/store'
import type { LoginDto } from '@/entities/auth/model/types'
import router from '@/router'
import { ref, computed } from 'vue'

export const useLogin = () => {
  const email = ref('')
  const password = ref('')
  const loading = ref(false)
  const submitError = ref<string | null>(null)
  const authStore = useAuthStore()

  function isValidEmail(value: string): boolean {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(value)
  }

  const emailError = computed(() => {
    if (!email.value) return null
    if (!isValidEmail(email.value)) return 'Некорректный email'
    return null
  })

  const passwordError = computed(() => {
    if (!password.value) return null
    if (password.value.length < 6) return 'Пароль должен быть не менее 6 символов'
    return null
  })

  const isFormValid = computed(() => {
    return email.value && password.value && !emailError.value && !passwordError.value
  })

  async function login() {
    if (!isFormValid.value) {
      submitError.value = 'Проверьте корректность данных'
      return
    }

    loading.value = true
    submitError.value = null

    try {
      const response = await authStore.loginUser({
        email: email.value,
        password: password.value,
      } as LoginDto)

      router.push({ name: 'ProfileView' })
      return response
    } catch (err: any) {
      console.error('useLogin', err)
      submitError.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    loading,
    submitError,

    emailError,
    passwordError,
    isFormValid,

    login,
  }
}
