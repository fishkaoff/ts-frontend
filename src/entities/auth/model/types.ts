export enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}

export interface User {
  id: string
  email: string
  name: string
  lastname: string
  role: UserRole
}

export interface RegisterDto {
  email: string
  name: string
  lastname: string
  password: string
}

export interface LoginDto {
  email: string
  password: string
}

export interface TokenPare {
  access_token: string
  refresh_token: string
}
