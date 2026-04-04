import { AppError } from '../app-error/app-error'

export function getErrorMessage(error: unknown): string {
  if (error instanceof AppError) {
    return error.message
  }

  return 'Неизвестная ошибка'
}
