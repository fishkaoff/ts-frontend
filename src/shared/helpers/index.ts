import { AppError } from '../app-error/app-error'

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  return 'Неизвестная ошибка'
}

export function debounce<T extends (...args: any[]) => void>(fn: T, delay: number) {
  let timeout: ReturnType<typeof setTimeout>

  return (...args: Parameters<T>) => {
    clearTimeout(timeout)
    timeout = setTimeout(() => {
      fn(...args)
    }, delay)
  }
}
