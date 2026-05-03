import type { ReactNode } from 'react'
import Header from './Header'
import Footer from './Footer'
import Toast from '@/components/common/Toast'
import Modal from '@/components/common/Modal'
import { useLocation } from '@tanstack/react-router'

export default function RootLayout({ children }: { children: ReactNode }) {
    const location = useLocation()
    const isDashboard = location.pathname.startsWith('/dashboard')

    return (
        <div className="flex flex-col h-full bg-slate-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100 transition-colors duration-200 overflow-hidden">
            <Header />
            <main className="flex-1 overflow-hidden relative">
                {children}
            </main>
            {/* Show footer only on landing page to keep dashboard full screen */}
            {!isDashboard && <Footer />}
            <Toast />
            <Modal />
        </div>
    )
}
