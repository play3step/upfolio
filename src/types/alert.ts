export interface AlertOptions {
  title?: string
  text?: string
  icon?: 'success' | 'error' | 'warning' | 'info' | 'question'
  confirmButtonText?: string
  cancelButtonText?: string
  timer?: number
}
