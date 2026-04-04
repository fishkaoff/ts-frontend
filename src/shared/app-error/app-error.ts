export class AppError {
  code: number
  error: string
  message: string

  constructor(code: number, error: string, message: string) {
    this.code = code
    this.error = error
    this.message = message
  }
}
