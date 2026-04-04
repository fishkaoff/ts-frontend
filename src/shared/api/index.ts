import { useAuthStore } from '@/entities/auth/model/store'
import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios'
import { AppError } from '../app-error/app-error'

const $host = axios.create({
  baseURL: '/api',
  headers: {
    Accepts: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const $authHost = axios.create({
  // baseURL: import.meta.env.VITE_BACKEND_BASE_URL,
  baseURL: '/api',
  headers: {
    Accepts: 'application/json',
    'Access-Control-Allow-Origin': '*',
  },
})

const authInterceptor = (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
  config.headers = config.headers || {}
  config.headers.Authorization = `Bearer ${localStorage.getItem('ts-access-token')}`
  return config
}

$authHost.interceptors.request.use(authInterceptor)

$authHost.interceptors.response.use(
  (res: AxiosResponse) => res,
  (error) => {
    let appError: AppError

    // Если есть ответ от сервера
    if (error.response) {
      const status = error.response.status

      const data = error.response.data

      appError = new AppError(status, data?.error || 'API_ERROR', data?.message || 'Unknown error')

      if (status === 401) {
        localStorage.removeItem('ts-access-token')

        const authStore = useAuthStore()
        authStore.isAuthorized = false
        authStore.user = undefined

        appError.code = 401
        appError.error = 'unauthorized'
        appError.message = 'Пользователь не авторизован'
      }
    } else if (error.request) {
      // Нет ответа от сервера (network error)
      appError = new AppError(0, 'NETWORK_ERROR', 'Server is not responding')
    } else {
      // Ошибка при настройке запроса
      appError = new AppError(0, 'REQUEST_ERROR', error.message)
    }

    return Promise.reject(appError)
  },
)

export { $host, $authHost }
