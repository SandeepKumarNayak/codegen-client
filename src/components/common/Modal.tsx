import type { ReactNode } from 'react'
import { useUIStore } from '@/stores/uiStore'

interface Props { children?: ReactNode }

export default function Modal({ children }: Props) {
    const { modal, closeModal } = useUIStore()
    if (!modal.isOpen) return null
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm transition-all duration-200" onClick={closeModal}>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-2xl shadow-2xl p-6 max-w-md w-full mx-4 animate-slide-in transition-colors duration-200" onClick={(e) => e.stopPropagation()}>
                {modal.title && <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-2 tracking-tight">{modal.title}</h2>}
                {modal.message && <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 leading-relaxed font-medium">{modal.message}</p>}
                {children}
                <button onClick={closeModal} className="mt-4 text-xs font-semibold text-gray-400 dark:text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors">Close</button>
            </div>
        </div>
    )
}
