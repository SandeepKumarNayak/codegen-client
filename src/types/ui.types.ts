export type Theme = 'dark' | 'light'
export type ToastType = 'success' | 'error' | 'info' | 'warning'

export interface ToastItem {
    id: string
    type: ToastType
    message: string
    duration?: number
}

export interface ModalConfig {
    isOpen: boolean
    title?: string
    message?: string
}
