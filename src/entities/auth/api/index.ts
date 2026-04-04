import { $authHost, $host } from '@/shared/api'
import type { LoginDto, RegisterDto } from '../model/types'

export const register = async (registerDto: RegisterDto) => {
  return $host.post('/auth/register', registerDto)
}
export const login = async (loginDto: LoginDto) => {
  return $host.post('/auth/login', loginDto)
}
export const fetchUserInfo = async () => {
  return $authHost.get('/auth/users')
}
