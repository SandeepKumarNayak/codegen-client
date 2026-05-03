import { create } from 'zustand'
import { devtools } from 'zustand/middleware'
import type { Theme, ToastItem, ModalConfig } from '@/types'
import { lsGet, lsSet } from '@/utils/localStorageManager'
import { LS_KEYS } from '@/utils/constants'

interface UIState {
    theme: Theme
    toasts: ToastItem[]
    modal: ModalConfig
    sidebarOpen: boolean
    setTheme: (t: Theme) => void
    toggleTheme: () => void
    showToast: (t: Omit<ToastItem, 'id'>) => void
    dismissToast: (id: string) => void
    openModal: (c: Omit<ModalConfig, 'isOpen'>) => void
    closeModal: () => void
    toggleSidebar: () => void
}

export const useUIStore = create<UIState>()(
    devtools((set, get) => ({
        theme: lsGet<Theme>(LS_KEYS.THEME, 'dark'),
        toasts: [],
        modal: { isOpen: false },
        sidebarOpen: true,
        setTheme: (theme) => {
            set({ theme })
            lsSet(LS_KEYS.THEME, theme)
            document.documentElement.classList.toggle('dark', theme === 'dark')
        },
        toggleTheme: () => get().setTheme(get().theme === 'dark' ? 'light' : 'dark'),
        showToast: (toast) => {
            const id = crypto.randomUUID()
            set((s) => ({ toasts: [...s.toasts, { ...toast, id }] }))
            setTimeout(() => get().dismissToast(id), toast.duration ?? 4000)
        },
        dismissToast: (id) => set((s) => ({ toasts: s.toasts.filter((t) => t.id !== id) })),
        openModal: (config) => set({ modal: { ...config, isOpen: true } }),
        closeModal: () => set({ modal: { isOpen: false } }),
        toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
    }), { name: 'UIStore' })
)
