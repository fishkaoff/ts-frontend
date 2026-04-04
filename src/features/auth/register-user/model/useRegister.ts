import { useAuthStore } from '@/entities/auth/model/store'
import type { LoginDto, RegisterDto } from '@/entities/auth/model/types'
import router from '@/router'
import { ref, computed } from 'vue'

export const useRegister = () => {
  const email = ref('')
  const password = ref('')
  const passwordRepeat = ref('')
  const name = ref('')
  const lastname = ref('')

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
    if (password.value != passwordRepeat.value) return 'Пароли не совпадают'
    return null
  })

  const nameError = computed(() => {
    if (!name.value) return null
    if (name.value.length < 2) return 'Имя должно быть не менее 2 символов'
  })

  const lastnameError = computed(() => {
    if (!lastname.value) return null
    if (lastname.value.length < 2) return 'Фамилия должна быть не менее 2 символов'
  })

  const isFormValid = computed(() => {
    return (
      email.value &&
      password.value &&
      name.value &&
      lastname.value &&
      passwordRepeat.value &&
      !emailError.value &&
      !passwordError.value &&
      !nameError.value &&
      !lastnameError.value
    )
  })

  async function register() {
    if (!isFormValid.value) {
      submitError.value = 'Проверьте корректность данных'
      return
    }

    loading.value = true
    submitError.value = null

    try {
      const response = await authStore.registerUser({
        email: email.value,
        password: password.value,
        name: name.value,
        lastname: lastname.value,
      } as RegisterDto)

      router.push({ name: 'LoginView' })
      return response
    } catch (err: any) {
      console.error('useRegister', err)
      submitError.value = err.message
      throw err
    } finally {
      loading.value = false
    }
  }

  return {
    email,
    password,
    name,
    lastname,
    passwordRepeat,

    loading,
    submitError,

    emailError,
    passwordError,
    nameError,
    lastnameError,
    isFormValid,

    register,
  }
}
