import { ref } from 'vue'
import { defineStore } from 'pinia'
import type { LoginDto, RegisterDto, User } from './types'
import { fetchUserInfo, login, register } from '../api'
import { getErrorMessage } from '@/shared/helpers'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User>()
  const isAuthorized = ref(false)
  const isAuthChecked = ref(false)

  async function registerUser(registerDto: RegisterDto) {
    try {
      const res = await register(registerDto)
      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function loginUser(loginDto: LoginDto) {
    try {
      const res = await login(loginDto)

      // set user and isAuthorized
      user.value = res.data.user
      isAuthorized.value = true

      // set access token to local storage
      localStorage.setItem('ts-access-token', res.data.tokens.access_token)

      return res
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function loadUserInfo() {
    try {
      const res = await fetchUserInfo()

      user.value = res.data
      isAuthorized.value = true
    } catch (error) {
      console.error(error)
      throw error
    }
  }

  async function initAuth() {
    const token = localStorage.getItem('ts-access-token')

    if (!token) {
      isAuthChecked.value = true
      return
    }

    try {
      await loadUserInfo()
    } catch (error) {
      localStorage.removeItem('ts-access-token')

      isAuthorized.value = false
      user.value = undefined
    } finally {
      isAuthChecked.value = true
    }
  }

  return { user, isAuthorized, registerUser, loginUser, loadUserInfo, isAuthChecked, initAuth }
})
