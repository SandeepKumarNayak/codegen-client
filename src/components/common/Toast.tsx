import type { ToastType } from '@/types'
import { useUIStore } from '@/stores/uiStore'

const icons: Record<ToastType, string> = { success: '✓', error: '✕', info: 'ℹ', warning: '⚠' }
const colors: Record<ToastType, string> = {
    success: 'bg-green-50 dark:bg-green-900/80 border-green-200 dark:border-green-500/50 text-green-800 dark:text-green-200',
    error: 'bg-red-50 dark:bg-red-900/80 border-red-200 dark:border-red-500/50 text-red-800 dark:text-red-200',
    info: 'bg-blue-50 dark:bg-blue-900/80 border-blue-200 dark:border-blue-500/50 text-blue-800 dark:text-blue-200',
    warning: 'bg-yellow-50 dark:bg-yellow-900/80 border-yellow-200 dark:border-yellow-500/50 text-yellow-800 dark:text-yellow-200',
}

export default function Toast() {
    const { toasts, dismissToast } = useUIStore()
    return (
        <div className="fixed top-4 right-4 z-50 flex flex-col gap-2 pointer-events-none">
            {toasts.map((t) => (
                <div key={t.id} className={`animate-slide-in flex items-center gap-3 px-4 py-3 rounded-xl border text-sm backdrop-blur-sm pointer-events-auto shadow-lg ${colors[t.type]} transition-all duration-200`}>
                    <span className="font-bold text-base bg-white/20 dark:bg-white/10 rounded-full w-6 h-6 flex items-center justify-center">{icons[t.type]}</span>
                    <span className="flex-1 font-medium">{t.message}</span>
                    <button onClick={() => dismissToast(t.id)} className="opacity-40 hover:opacity-100 ml-2 text-xl leading-none transition-opacity">&times;</button>
                </div>
            ))}
        </div>
    )
}
